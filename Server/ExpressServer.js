import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import { connectToDatabase } from '../DB/dbConnection.js';
import Todorouter from './Routes/Todos.js';
import PostRouter from './Routes/Posts.js';
import UserRouter from './Routes/Users.js';
import CommentsRouter from './Routes/Comments.js';

const app = express();
const port = 3000;


const db = await connectToDatabase();

app.use(express.json());
app.use((req, res, next) => {
    req.db = db;
    next();
});

import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:5174'
  }));

app.use('/todos', Todorouter);
app.use('/posts', PostRouter);
app.use('/users', UserRouter);
app.use('/comments', CommentsRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
