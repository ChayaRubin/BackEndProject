 import {getUserWithPasswordByName, addUser ,addPassword} from '../Service/Users.js';

import CryptoJS from 'crypto-js';
const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');




export const addUserTo = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // מוסיף את המשתמש
    const newUserId = await addUser({ name: username, email });
console.log('newUserId:', { user_id: newUserId, hashed_password: password });
    // מוסיף את הסיסמה (בהנחה שהיא כבר מוצפנת)
    await addPassword({ user_id: newUserId, hashed_password: password });

    res.status(201).json({ id: newUserId });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Error adding user' });
  }
};

export async function getUserByNameTo(req, res) {
    const { name } = req.params;

    try {
        const user = await getUserWithPasswordByName(name);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in getUserByNameController:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
