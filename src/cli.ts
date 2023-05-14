#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import app from './app';
import { Protocol, Port } from './types';

const runProxyServer = () => {
    const [,, protocolArg, portArg] = process.argv;
    const protocol = protocolArg as Protocol;
    const port = Number(portArg) as Port;

    app.listen(protocol, port, err => {
        if (err) {
            console.log('[Tally Me Banana Proxy]:', err.message);
            process.exit(1);
        }
        console.log(`[Tally Me Banana Proxy]: 🍌🍌🍌 proxying ${protocol.toUpperCase()} requests on port ${port}ㅤ🍌🍌🍌`);
    });
};

yargs(hideBin(process.argv))
    .command(
        'http',
        'Create & run a proxy server for HTTP requests\nArguments: <port>\nExample: tally http 5050\n',
        runProxyServer,
    )
    .command(
        'tcp',
        'Create & run a proxy server for TCP requests\nArguments: <port>\nExample: tally tcp 5050\n',
        runProxyServer,
    )
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;
