import express from 'express';
import helmet from 'helmet';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(helmet());
app.use(rateLimiter)

export default app;