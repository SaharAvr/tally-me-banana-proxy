import ssh2 from 'ssh2';
import crypto from 'node:crypto';
import { createSocks5ProxyServer } from '@applitools/eg-socks5-proxy-server';
import { StartServerOptions, TcpProxyServer } from '../types';

export const startTcpServer = (options: StartServerOptions): TcpProxyServer => {

    const { privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    const sshServer = new ssh2.Server({ hostKeys: [privateKey] });
    sshServer.listen(2222);

    const socks5Server = createSocks5ProxyServer({
        proxyServer: {
            address: 'localhost',
            port: 2222,
        },
    });
    socks5Server.listen(options.port, options.callback);

    return {
        ssh: sshServer,
        socks5: socks5Server,
    };

};

export default {
    startTcpServer,
};
