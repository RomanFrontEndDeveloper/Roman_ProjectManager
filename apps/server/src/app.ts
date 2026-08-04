import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { globalRateLimit } from './middlewares/rateLimit.js';
import morgan from 'morgan';

// Morgan — middleware для логування HTTP-запитів.
// Він показує метод, маршрут, статус і час виконання.

const app = express();

app.use(helmet());

app.use(
	cors({
		origin: env.CLIENT_URL,
	}),
);

app.use(globalRateLimit); // кожен HTTP-запит спочатку проходить через globalRateLimit, і лише потім потрапляє в маршрути.

app.use(morgan('dev'));
// підключає middleware, який виводить у консоль інформацію про
//  кожен HTTP-запит у зручному для розробки форматі.

// Дозволяє фронтенду з http://localhost:3000 надсилати HTTP-запити до цього Express-сервера (налаштовує CORS).

app.get('/', (_, res) => {
	res.send('Roman Project Manager API');
});

export default app;

// app.get() — створює маршрут для GET-запиту.
// '/' — головний маршрут (http://localhost:5000/).
// _ — об'єкт request, який тут не використовується.
// res — об'єкт відповіді клієнту.
// res.send() — відправляє текстову відповідь.
// Тобто: коли користувач відкриває http://localhost:5000/, сервер повертає текст Roman Project Manager API.

// 304 - Запитуваний ресурс не змінився з моменту останнього
//  запиту, тому браузер може використати свою кешовану копію.
