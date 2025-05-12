import db from '../../DB/dbConnection.js';

export const getUserByName = async (name) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};


export async function getUserWithPasswordByName(name) {
    try {
        const [users] = await db.query(`
            SELECT u.id, u.name, u.email, p.hashed_password
            FROM users u
            JOIN passwords p ON u.id = p.user_id
            WHERE u.name = ?
        `, [name]);
        return users[0];
    } catch (err) {
        throw err;
    }
}

export async function addUser(userData) {
    try {
        
        const { name, email } = userData;
        console.log(userData); 
        const [result] = await db.query(`
            INSERT INTO users (name, email)
            VALUES (?, ?)
        `, [name, email]);

        return result.insertId;
    } catch (err) {
        throw err;
    }
}
export async function addPassword({ user_id, hashed_password }) {
  try {
        console.log("ADDING PASSWORD FOR:", user_id, hashed_password);

    const [result] = await db.query(`
      INSERT INTO passwords (user_id, hashed_password)
      VALUES (?, ?)
    `, [user_id, hashed_password]);

    return result.insertId;
  } catch (err) {
    throw err;
  }
}
