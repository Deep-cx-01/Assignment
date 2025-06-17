import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import sequelize from './config/database';
import reviewRoutes from './routes/reviewRoutes';



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', reviewRoutes);

// Database connection and server start
console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer(); 