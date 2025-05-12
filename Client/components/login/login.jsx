import React, { useRef, useState } from 'react';
import styles from './login.module.css';
import { useCurrentUser } from '../userProvider.jsx';
import { useNavigate, Link } from 'react-router-dom'
import CryptoJS from 'crypto-js';
//Login Form
export default function Login() {
    const nameRef = useRef();
    const passwordRef = useRef();
    const alertDivRef = useRef();
    const navigate = useNavigate();
    const { setCurrentUser } = useCurrentUser();
    const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
    const IV = CryptoJS.enc.Utf8.parse('6543210987654321');
    const [error, setError] = useState(null);

    //update the text in alert div.
    const manageMassages = (message) => {
        alertDivRef.current.innerText = message;
    }

const checkUserExists = async (username, password) => {
    try {
        console.log("un", username)

        const response = await fetch(`http://localhost:3000/users/get/${username}` ,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            return { ok: false, user: null };
        }

        const user = await response.json();
        console.log("userrr",user); // הדפס את המשתמש בקונסול
        return { ok: true, user };

    } catch (error) {
        console.error(error); // הדפס את השגיאה אם יש
        return { ok: false, user: null };
    }
};


    //if the user is valid - navigate to home page.
    const handleLoginSubmit = (event) => {
        event.preventDefault()
        checkUserExists(nameRef.current.value, passwordRef.current.value).then((exists) => {
            if (!exists.ok) {
                manageMassages('user name or password incorrect, try again');
            } else {
                console.log("wwwww", nameRef.current.value, passwordRef.current.value)
                let currentUser = {
                    id: exists.user.id,
                    username: passwordRef.current.value,
                    email: exists.user.email,
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                setCurrentUser(currentUser);
                navigate('/home');
            }
        });
    }

    if (error) return <p>Error: {error}</p>;

    return (
<div className={styles.loginForm}>
    <div id="container" className={styles.container}>
        <h3 className={styles.title}>Login</h3>
        <form onSubmit={handleLoginSubmit} className={styles.form}>
            <input ref={nameRef} type="text" placeholder="name" required className={styles.input} />
            <input ref={passwordRef} type="password" placeholder="password" required className={styles.input} />
            <div ref={alertDivRef} className={styles.alert}></div>
            <button type="submit" className={styles.button}>submit</button>
            <div className={styles.linkContainer}>
                <span>First time? </span>
                <Link to="/register" className={styles.link}>Register</Link>
            </div>
        </form>
    </div>
</div>


    )
}