import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
export async function connectToDatabase(database = null) {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Chaya26!',
     database: 'user_system', // כדי לא צריך לכתוב USE
    multipleStatements: true // חשוב לצורך הרצת כמה CREATE TABLEs בבת אחת
  });

  console.log(`Connected to database${database ? `: ${database}` : ''}`);
  return connection;
}

const con = await connectToDatabase();
export default con;

