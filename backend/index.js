import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './router/userroute.js';
import { notfound, errorhandler } from './middleware/errorhandling.js';
import Dburl from './connection/mongo.js';

// Load environment variables
dotenv.config();
Dburl();

// Create an instance of express
const app = express();

// Define the port
const port = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())


// Define routes
app.use('/api/users', userRouter);  

// Root route
app.get('/', (req, res) => res.send('The server is ready'));

// Error handling middleware
app.use(notfound);
app.use(errorhandler);

// Start the server
app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
