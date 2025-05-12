import { connectToDatabase } from './dbConnection.js';

async function initDatabase() {
  const con = await connectToDatabase();

  await con.query(`CREATE DATABASE IF NOT EXISTS user_system`);
  console.log('Database created or already exists.');

  await con.end();

  const dbCon = await connectToDatabase('user_system');

  await dbCon.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100)UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS passwords (
      user_id INT PRIMARY KEY,
      hashed_password VARCHAR(255) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

  CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


    CREATE TABLE IF NOT EXISTS posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255),
      body TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT,
      name VARCHAR(100),
      email VARCHAR(100),
      body TEXT,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );
  `);

  console.log('Tables created!');
  await dbCon.end();
}

initDatabase();
