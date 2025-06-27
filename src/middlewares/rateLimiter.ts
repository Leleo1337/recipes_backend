import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 1000,
	standardHeaders: true,
	legacyHeaders: false,
	message: 'Muitas requisições deste IP, por favor tente novamente após 15 minutos.',
});

export default rateLimiter;
