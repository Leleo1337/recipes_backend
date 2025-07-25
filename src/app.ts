import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import auth from './routes/auth';
import recipes from './routes/recipes';
import comments from './routes/comments';
import userData from './routes/userData';

import rateLimiter from './middlewares/rateLimiter';
import errorHandlerMiddleware from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());

// security
app.use(helmet());
app.use(cors());
app.use(rateLimiter);

// routes

app.get('/', (req, res) => {
	res.send('Welcome to recipes backend');
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1/recipes/:recipeID/comments', comments);
app.use('/api/v1/me', userData);

app.use(routeNotFound);
app.use(errorHandlerMiddleware);

export default app;
