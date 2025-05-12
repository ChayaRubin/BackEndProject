 import { getUserByName, addUser } from '../Service/Users.js';

export const GetUserByNameTo = async (req, res) => {
    try {
        console.log("req.params", req.params);
        const userName = req.params.name;
        const user = await getUserByName(userName);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

// // export const addUserTo = async (req, res) => {
// //     try {
// //         const userData = req.body;
// //         const newUserId = await addUser(userData);
// //         res.status(201).json({ id: newUserId });
// //     } catch (err) {
// //         console.error('Error adding user:', err);
// //         res.status(500).json({ message: 'Error adding user' });
// //     }
// // };

// export const addUserTo = async (req, res) => {
//     try {
//         const { username } = req.body;

//         // בדוק אם המשתמש כבר קיים
//         const existingUser = await getUserWithPasswordByName(username);
//         if (existingUser) {
//             return res.status(409).json({ message: 'User already exists' }); // קוד 409: Conflict
//         }

//         // אם המשתמש לא קיים, הוסף אותו
//         const newUserId = await addUser(req.body);
//         res.status(201).json({ id: newUserId });
//     } catch (err) {
//         console.error('Error adding user:', err);
//         res.status(500).json({ message: 'Error adding user' });
//     }
// };
// // Controllers/Users.js
// import CryptoJS from 'crypto-js';
// import { getUserWithPasswordByName } from '../Service/Users.js';

// const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
// const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

// export const loginUser = async (req, res) => {
//     try {
//         const { name, password } = req.body;
//         const user = await getUserWithPasswordByName(name);

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // השוואת סיסמה לאחר פענוח
//         const decrypted = CryptoJS.AES.decrypt(user.hashed_password, KEY, {
//             iv: IV,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7
//         }).toString(CryptoJS.enc.Utf8);

//         if (decrypted !== password) {
//             return res.status(401).json({ message: 'Invalid username or password' });
//         }

//         // אם הצליח – שולחים פרטים (ללא סיסמה כמובן)
//         res.json({
//             id: user.id,
//             name: user.name,
//             email: user.email
//         });

//     } catch (err) {
//         console.error('Error logging in:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
import { getUserWithPasswordByName } from '../Service/Users.js';
import CryptoJS from 'crypto-js';

const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

export const loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await getUserWithPasswordByName(name);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // פענוח הסיסמה המוצפנת
        const decrypted = CryptoJS.AES.decrypt(user.hashed_password, KEY, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);

        if (decrypted !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // אם הצליח – שולחים פרטי המשתמש (ללא סיסמה כמובן)
        res.json({
            id: user.id,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
export const addUserTo = async (req, res) => {
    try {
        const { username } = req.body;

        // בדוק אם המשתמש כבר קיים
        const existingUser = await getUserWithPasswordByName(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' }); // קוד 409: Conflict
        }

        // אם המשתמש לא קיים, הוסף אותו
        const newUserId = await addUser(req.body);
        res.status(201).json({ id: newUserId });
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ message: 'Error adding user' });
    }
};
