import db from '../../DB/dbConnection.js';

export const getUserByName = async (name) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};

export const addUser = async (userData) => {
  const { username, email, password } = userData;

  // Insert into `users` table
  const [result] = await db.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [username, email]
  );

  const userId = result.insertId;

  // Insert the encrypted password into `passwords` table
  await db.execute(
    'INSERT INTO passwords (user_id, hashed_password) VALUES (?, ?)',
    [userId, password] // Save the encrypted password directly
  );

  return userId;
};

export const getUserWithPasswordByName = async (username) => {
  const [rows] = await db.execute(`
    SELECT users.id, users.name, users.email, passwords.hashed_password
    FROM users
    JOIN passwords ON users.id = passwords.user_id
    WHERE users.name = ?
  `, [username]);

  return rows[0];
};


