import http from 'http';
import { SocksProxyAgent } from 'socks-proxy-agent';
import { startTcpServer } from '../servers/tcp';
import { TcpProxyServer } from '../types';

describe('TCP Proxy Server', () => {

    let tcpProxyServer: TcpProxyServer;

    afterEach(() => {
        tcpProxyServer.ssh.close();
        tcpProxyServer.socks5.close();
    });

    test('should start the TCP proxy server', async() => {
        const port = 5057;
        const promise = new Promise<void>((resolve, reject) => {
            startTcpServer({
                port,
                callback: err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                },
            }).then(server => {
                tcpProxyServer = server;
            });
        });

        await expect(promise).resolves.toBeUndefined();
    });

    test('should handle proxy request for TCP', async() => {
        const targetPort = 5058;
        const proxyPort = 5059;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Hello TCP World');
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        tcpProxyServer = await startTcpServer({ port: proxyPort });

        const agent = new SocksProxyAgent(`socks5://localhost:${proxyPort}`, {
            timeout: 1000,
        });

        const requestOptions = {
            hostname: 'localhost',
            port: targetPort,
            path: '/',
            method: 'GET',
            agent: agent,
        };

        await new Promise<void>((resolve, reject) => {
            const req = http.request(requestOptions, res => {
                expect(res.statusCode).toBe(200);
                let responseData = '';
                res.on('data', data => {
                    responseData += data.toString();
                });
                res.on('end', () => {
                    expect(responseData).toBe('Hello TCP World');
                    resolve();
                });
            });

            req.on('error', reject);
            req.end();
        });

        targetServer.close();
    });

    test('should handle 404 Not Found from target server', async() => {
        const targetPort = 5060;
        const proxyPort = 5061;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Not Found');
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        tcpProxyServer = await startTcpServer({ port: proxyPort });

        const agent = new SocksProxyAgent(`socks5://localhost:${proxyPort}`);

        const requestOptions = {
            hostname: 'localhost',
            port: targetPort,
            path: '/nonexistent',
            method: 'GET',
            agent: agent,
        };

        await new Promise<void>((resolve, reject) => {
            const req = http.request(requestOptions, res => {
                expect(res.statusCode).toBe(404);
                let responseData = '';
                res.on('data', data => {
                    responseData += data.toString();
                });
                res.on('end', () => {
                    expect(responseData).toBe('Not Found');
                    resolve();
                });
            });

            req.on('error', reject);
            req.end();
        });

        targetServer.close();
    });

    test('should handle POST request with JSON payload', async() => {
        const targetPort = 5062;
        const proxyPort = 5063;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'POST request received' }));
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        tcpProxyServer = await startTcpServer({ port: proxyPort });

        const agent = new SocksProxyAgent(`socks5://localhost:${proxyPort}`);

        const requestOptions = {
            hostname: 'localhost',
            port: targetPort,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            agent: agent,
        };

        await new Promise<void>((resolve, reject) => {
            const req = http.request(requestOptions, res => {
                expect(res.statusCode).toBe(200);
                let responseData = '';
                res.on('data', data => {
                    responseData += data.toString();
                });
                res.on('end', () => {
                    expect(JSON.parse(responseData)).toEqual({ message: 'POST request received' });
                    resolve();
                });
            });

            req.on('error', reject);
            req.write(JSON.stringify({ data: 'Test data' }));
            req.end();
        });

        targetServer.close();
    });

});
