/**
 * Tally Me Banana Proxy - A lightweight and powerful proxy server
 * @author Sahar Avraham
 * @version 3.1.0
 */

import express from 'express';
import bodyParser from 'body-parser';
import proxyRoute from './routes/proxy';

const app = express();

app.use(bodyParser.json());
app.use('/proxy', proxyRoute);

export default app;
