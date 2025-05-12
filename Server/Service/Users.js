
import db from '../../DB/dbConnection.js';
import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

// הצפנת הסיסמה לפני שמכניסים אותה למסד נתונים
// export const addUser = async (userData) => {
//     const { username, email, password } = userData;
//     console.log(userData); // לראות את הנתונים שנשלחו מהלקוח
//     // // הצפנת הסיסמה
//     // const encryptedPassword = CryptoJS.AES.encrypt(password, KEY, {
//     //     iv: IV,
//     //     mode: CryptoJS.mode.CBC,
//     //     padding: CryptoJS.pad.Pkcs7
//     // }).toString();

//     // הכנסה למסד הנתונים
//     const [result] = await db.execute(
//         'INSERT INTO users (name, email) VALUES (?, ?)',
//         [username, email]
//     );

//     const userId = result.insertId;

//     // הכנסה לטבלת passwords
//     await db.execute(
//         'INSERT INTO passwords (user_id, hashed_password) VALUES (?, ?)',
//         [userId, password]
//     );

//     return userId;
// };


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
        console.log(userData); // לראות את הנתונים שנשלחו מהלקוח
        const [result] = await db.query(`
            INSERT INTO users (name, email)
            VALUES (?, ?)
        `, [name, email]);

        return result.insertId; // מחזיר את ה-ID של המשתמש שנוסף
    } catch (err) {
        throw err;
    }
}
export async function addPassword({ user_id, hashed_password }) {
  try {
        console.log("ADDING PASSWORD FOR:", user_id, hashed_password); // ✅ בדיקה

    const [result] = await db.query(`
      INSERT INTO passwords (user_id, hashed_password)
      VALUES (?, ?)
    `, [user_id, hashed_password]);

    return result.insertId;
  } catch (err) {
    throw err;
  }
}
