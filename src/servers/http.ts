import http from 'http';
import https from 'https';
import net from 'net';
import { StartServerOptions } from '../types';

const handleProxyRequest = (clientReq: http.IncomingMessage, clientRes: http.ServerResponse) => {

    const parsedReqUrl = new URL(clientReq.url as string);
    const targetProtocol = (parsedReqUrl.protocol || 'http:');
    const targetPort = (targetProtocol === 'https:' ? 443 : 80);
    const targetModule = (targetProtocol === 'https:' ? https : http);
    const requestOptions = {
        hostname: (parsedReqUrl.hostname || clientReq.headers.host),
        port: targetPort,
        path: `${parsedReqUrl.pathname}${parsedReqUrl.search || ''}`,
        method: clientReq.method,
        headers: clientReq.headers,
    };

    const proxyReq = targetModule.request(requestOptions, (res: http.IncomingMessage) => {
        clientRes.writeHead(res.statusCode as number, res.headers);
        res.pipe(clientRes, { end: true });
    });

    proxyReq.on('error', err => {
        console.error(`Error on proxy request: ${err.message}`, {
            url: clientReq.url,
            headers: clientReq.headers,
        });
        clientRes.writeHead(500);
        clientRes.end();
    });

    clientReq.pipe(proxyReq, { end: true });

};

const handleProxyConnect = (req: http.IncomingMessage, clientSocket: net.Socket, head: Buffer) => {

    const parsedReqUrl = new URL(`https://${req.url}`);

    const targetSocket = net.connect((Number(parsedReqUrl.port) || 443), parsedReqUrl.hostname, () => {
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        targetSocket.write(head);
        targetSocket.pipe(clientSocket);
        clientSocket.pipe(targetSocket);
    });

    targetSocket.on('error', () => {
        clientSocket.end();
    });

    clientSocket.on('error', () => {
        targetSocket.end();
    });

};

export const startHttpServer = (options: StartServerOptions): http.Server => {

    const proxyServer = http.createServer();

    proxyServer.on('request', handleProxyRequest);
    proxyServer.on('connect', handleProxyConnect);
    proxyServer.listen(options.port, options.callback);

    return proxyServer;

};

export default {
    startHttpServer,
};
