 import {getUserWithPasswordByName, addUser } from '../Service/Users.js';

import CryptoJS from 'crypto-js';
const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

export const addUserTo = async (req, res) => {
    try {
        const { username } = req.body;
        const existingUser = await getUserWithPasswordByName(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' }); // קוד 409: Conflict
        }
        const newUserId = await addUser(req.body);
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
