import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './router/userroute.js';
import adminRouter from "./router/adminRoute.js"
import { notfound, errorhandler } from './middleware/errorhandling.js';
import Dburl from './connection/mongo.js';

dotenv.config();
Dburl();

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/admin',adminRouter);

app.get('/', (req, res) => res.send('The server is ready'));

// Error handling ;
app.use(notfound);
app.use(errorhandler);

app.listen(port, () => console.log(`The server is running on http://localhost:${port}`));
