import http from 'http';
import httpProxy from 'http-proxy';
import { startHttpServer } from '../servers/http';
import { HttpProxyServer } from '../types';

describe('HTTP Proxy Server', () => {

    let httpProxyServer: HttpProxyServer;

    afterEach(() => {
        httpProxyServer.close();
    });

    test('should start the HTTP proxy server', async () => {
        const port = 5050;
        const promise = new Promise<void>((resolve, reject) => {
            httpProxyServer = startHttpServer({
                port,
                callback: err => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                },
            });
        });

        await expect(promise).resolves.toBeUndefined();
    });

    test('should handle proxy request for HTTP', async () => {
        const targetPort = 5051;
        const proxyPort = 5052;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Hello World');
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        const proxy = httpProxy.createProxyServer({ target: `http://localhost:${targetPort}` });
        httpProxyServer = http.createServer((req, res) => {
            proxy.web(req, res);
        }).listen(proxyPort);

        const requestOptions = {
            hostname: 'localhost',
            port: proxyPort,
            path: '/',
            method: 'GET',
        };

        await new Promise<void>((resolve, reject) => {
            const req = http.request(requestOptions, res => {
                expect(res.statusCode).toBe(200);
                let responseData = '';
                res.on('data', data => {
                    responseData += data.toString();
                });
                res.on('end', () => {
                    expect(responseData).toBe('Hello World');
                    resolve();
                });
            });

            req.on('error', reject);
            req.end();
        });

        targetServer.close();
    });

    test('should handle 404 Not Found from target server', async () => {
        const targetPort = 5053;
        const proxyPort = 5054;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Not Found');
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        const proxy = httpProxy.createProxyServer({ target: `http://localhost:${targetPort}` });
        httpProxyServer = http.createServer((req, res) => {
            proxy.web(req, res);
        }).listen(proxyPort);

        const requestOptions = {
            hostname: 'localhost',
            port: proxyPort,
            path: '/nonexistent',
            method: 'GET',
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

    test('should handle POST request with JSON payload', async () => {
        const targetPort = 5055;
        const proxyPort = 5056;

        const targetServer = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: 'POST request received' }));
            res.end();
        });

        await new Promise<void>(resolve => {
            targetServer.listen(targetPort, resolve);
        });

        const proxy = httpProxy.createProxyServer({ target: `http://localhost:${targetPort}` });
        httpProxyServer = http.createServer((req, res) => {
            proxy.web(req, res);
        }).listen(proxyPort);

        const requestOptions = {
            hostname: 'localhost',
            port: proxyPort,
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
