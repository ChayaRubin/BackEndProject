 import {getUserWithPasswordByName, addUser ,addPassword} from '../Service/Users.js';

import CryptoJS from 'crypto-js';
const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');




export const addUserTo = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUserId = await addUser({ name: username, email });
console.log('newUserId:', { user_id: newUserId, hashed_password: password });
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

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserWithPasswordByName(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const decryptedPassword = CryptoJS.AES.decrypt(user.hashed_password, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({
            id: user.id,
            name: user.name, 
            email: user.email,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

