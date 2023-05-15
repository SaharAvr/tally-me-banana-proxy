import * as http from 'http';
import * as net from 'net';
import { SocksServer } from '@applitools/eg-socks5-proxy-server';

/**
 * Supported protocols (http, tcp)
 */
export type Protocol = 'http' | 'tcp';

/**
 * Port number, used for listening to incoming requests on a specific port
 */
export type Port = number;

/**
 * Callback function, used for error handling and logging
 */
export type Callback = (err?: Error) => void;

/**
 * Listen function, used for starting the proxy server
 */
export type Listen = (
    protocol: Protocol,
    port: Port,
    callback: Callback
) => void;

/**
 * App object, used for exporting the listen function
 */
export type App = {
    listen: Listen;
};

/**
 * Handle proxy request function, used for handling incoming http requests
 */
export type HandleProxyRequest = (clientReq: http.IncomingMessage, clientRes: http.ServerResponse) => void;

/**
 * Handle proxy connect function, used for handling incoming tcp requests
 */
export type HandleProxyConnect = (req: http.IncomingMessage, clientSocket: net.Socket, head: Buffer) => void;

/**
 * Start server options, used for starting the proxy server
 */
export type StartServerOptions = {
    /**
     * Port number, used for listening to incoming requests on a specific port
     */
    port: Port;
    /**
     * Callback function, used for error handling and logging
     */
    callback?: Callback;
};

/**
 * Http proxy server, used for handling incoming http requests
 */
export type HttpProxyServer = http.Server & {
    /**
     * Handle proxy request function, used for handling incoming http requests
     */
    on(event: 'request', listener: HandleProxyRequest): void;
    /**
     * Handle proxy connect function, used for handling incoming tcp requests
     */
    on(event: 'connect', listener: HandleProxyConnect): void;
};

/**
 * Tcp proxy server, used for handling incoming tcp requests
 */
export type TcpProxyServer = {
    /**
     * Ssh server, used for handling incoming tcp requests
     */
    ssh: net.Server;
    /**
     * Socks5 server, used for handling incoming tcp requests
     */
    socks5: SocksServer;
};
