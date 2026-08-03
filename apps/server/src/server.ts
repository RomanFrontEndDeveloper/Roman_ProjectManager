import { env } from './config/env.js';

console.log('PORT:', env.PORT);
console.log('Mongo:', env.MONGODB_URI);
console.log('JWT:', env.JWT_SECRET);
console.log('Client:', env.CLIENT_URL);

console.log('Server is running...');
