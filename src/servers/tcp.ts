import ssh2 from 'ssh2-custom';
import crypto from 'node:crypto';
import { createSocks5ProxyServer } from '@applitools/eg-socks5-proxy-server';
import { StartServerOptions, TcpProxyServer } from '../types';

const SSH_PORT = 22;

export const startTcpServer = async(options: StartServerOptions): Promise<TcpProxyServer> => {

    const { privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
    });

    const sshServer = new ssh2.Server({ hostKeys: [privateKey] });
    sshServer.listen(SSH_PORT);

    const socks5Server = createSocks5ProxyServer({
        proxyServer: {
            address: 'localhost',
            port: SSH_PORT,
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
