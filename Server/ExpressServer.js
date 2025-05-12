import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
// import path from 'path';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
import mysql from 'mysql2';

import { connectToDatabase } from '../DB/dbConnection.js';
import Todorouter from './Routes/Todos.js';
// import PostRouter from './Routes/Posts.js';
import UserRouter from './Routes/Users.js';
import CommentsRouter from './Routes/Comments.js';

const app = express();
const port = 3000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

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
// app.use('/posts', PostRouter);
app.use('/users', UserRouter);
app.use('/comments', CommentsRouter);


// app.get('/', (req, res) => {
//     const componentsDir = path.join(__dirname, '../components');
//     console.log('Reading components directory:', componentsDir);

//     fs.readdir(componentsDir, (err, files) => {
//         if (err) {
//             console.error('Error reading components directory:', err);
//             return res.status(500).send('Error reading components directory');
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
