/**
 * Tally Me Banana Proxy - A lightweight and powerful proxy server
 * @author Sahar Avraham
 * @version 4.1.2
 */

import { startHttpServer } from './servers/http';
import { startTcpServer } from './servers/tcp';
import { Protocol, Port, Callback, Listen } from './types';

export const listen: Listen = (
    protocol: Protocol,
    port: Port,
    callback: Callback
) => {

    if (protocol === 'http') {
        startHttpServer({ port, callback });
        return;
    }

    if (protocol === 'tcp') {
        startTcpServer({ port, callback });
        return;
    }

    return callback(new Error(`Unsupported protocol: ${protocol} not supported. Supported protocols are http and tcp`));

};

export default {
    listen,
};
