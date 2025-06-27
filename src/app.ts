import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiter from './middlewares/rateLimiter';
import errorHandlerMiddleware from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';

const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(cors());

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.use(routeNotFound)
app.use(errorHandlerMiddleware);

export default app;
