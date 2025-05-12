import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useCurrentUser } from '../userProvider.jsx';
import CryptoJS from 'crypto-js';
import styles from './register.module.css'
export default function Register() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordVerRef = useRef();
  const alertDivRef = useRef();
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456');
  const IV = CryptoJS.enc.Utf8.parse('6543210987654321');

  const manageMassages = (message) => {
    alertDivRef.current.innerText = message;
  }

const checkUserExists = async (username) => {
  try {
    const response = await fetch('http://localhost:3000/users/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    if (response.status === 409) {
      return true;
    }

    if (!response.ok) {
      throw new Error('Failed to check user existence');
    }

    return false; 
  } catch (error) {
    return false;
  }
};

const verifyPassword = () => {
    return (passwordRef.current.value === passwordVerRef.current.value);
  }

  const handleRegisterSubmit = (event) => {
    event.preventDefault()
    checkUserExists(nameRef.current.value).then((exists) => {
      if (exists) {
        manageMassages('User already exists');
      } else {
        if (verifyPassword()) {
          let currentUser = {
            username: nameRef.current.value,
            website: CryptoJS.AES.encrypt(passwordVerRef.current.value, KEY, {
              iv: IV,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }).toString()
          }
          setCurrentUser(currentUser);
          navigate('/userDetails');
        }
        else {
          manageMassages('You have to use the same password.Please recheck!');
          passwordVerRef.current.value = '';
        }
      }
    });
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h3 className={styles.title}>New Account</h3>
      <div className={styles.steps}><strong>1</strong> / 2 STEPS</div>
      <form className={styles.container} onSubmit={handleRegisterSubmit}>
        <input className={styles.input} ref={nameRef} type="text" placeholder="name" required />
        <input className={styles.input} ref={passwordRef} type="password" placeholder="password" required />
        <input className={styles.input} ref={passwordVerRef} type="password" placeholder="verify password" required />
        <div className={styles.alert} ref={alertDivRef}></div>
        <button className={styles.button} type="submit">submit</button>
        <div className={styles.linkContainer}>Already have an account?</div>
        <Link className={styles.link} to="/login">Login</Link>
      </form>

    </>
  )
}