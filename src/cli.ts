#!/usr/bin/env node

import app from './app';
import { Protocol, Port } from './types';

const [,, protocolArg, portArg] = process.argv;
const PROTOCOL = (protocolArg || 'http') as Protocol;
const PORT = (portArg ? parseInt(portArg, 10) : 3000) as Port;

app.listen(PROTOCOL, PORT, err => {
    if (err) {
        console.log('[Tally Me Banana Proxy]:', err.message);
        process.exit(1);
    }
    console.log(`[Tally Me Banana Proxy]: 🍌🍌🍌 proxying ${PROTOCOL} requests on port ${PORT}ㅤ🍌🍌🍌`);
});
