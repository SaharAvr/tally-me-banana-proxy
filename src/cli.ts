#!/usr/bin/env node

import app from './app';

const [,, portArg] = process.argv;
const PORT_DEFAULT = 3000;
const PORT = (portArg ? parseInt(portArg, 10) : PORT_DEFAULT);

app.listen(PORT, () => {
  console.log(`[Tally Me Banana Proxy]: ⚡⚡⚡listening on port ${PORT} ⚡⚡⚡`);
});
