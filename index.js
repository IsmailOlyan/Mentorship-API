import express from 'express'; 
import helmet from 'helmet';


import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import taskRoutes from './routes/tasks.js';


import dotenv from 'dotenv';
dotenv.config(); 

import logger from './middlewares/logger.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { limiter } from './middlewares/rateLimiter.js';

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';




import cors from 'cors'; 
import morgan from 'morgan';
import mongoose from 'mongoose';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(helmet());
app.use(express.json()); 
app.use(limiter);
app.use(cors(
  {
    origin: ['http://localhost:5000', 'http://localhost:5173']
  }
)); 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(logger);

app.use('/users', userRoutes); 
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/tasks', taskRoutes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(notFound);

app.use(errorHandler);

mongoose.connect(process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
  .then(() => {
    console.log('✅ MongoDB connected locally')
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
  });


app.listen(PORT, () => {
  console.log(`Server is running now on http://localhost:${PORT}`);
});