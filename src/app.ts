import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import auth from './routes/auth';
import recipes from './routes/recipes';
import comments from './routes/comments';

import rateLimiter from './middlewares/rateLimiter';
import errorHandlerMiddleware from './middlewares/errorHandler';
import routeNotFound from './middlewares/routeNotFound';
import authMiddleware from './middlewares/auth';

const app = express();

app.use(express.json());

// security
app.use(helmet());
app.use(cors());
app.use(rateLimiter);

// routes

app.use('/api/v1/auth', auth);
app.use('/api/v1/recipes', recipes);
app.use('/api/v1/recipes/:recipeID/comments', comments);

app.use(routeNotFound);
app.use(errorHandlerMiddleware);

export default app;
