import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';

await mongoose.connect(env.MONGODB_URI);

console.log('MongoDB connected');

app.listen(env.PORT, () => {
	console.log(`Server is running on http://localhost:${env.PORT}`);
});

// Origin складається з трьох частин: Protocol + Domain + Port
// приклад: http://localhost:3000
