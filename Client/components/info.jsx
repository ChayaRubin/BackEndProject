import React, { useEffect, useState } from 'react';
import { useCurrentUser } from './userProvider';
import Nav from './nav/nav';

//Show the current user's details.
const Info = () => {
    const { currentUser } = useCurrentUser();
    const [userData, setUserData] = useState(null);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Get the information from the DB.
    useEffect(() => {
        
        const getUserData = async () => {
            try {
                debugger
                // const response = await fetch(`http://localhost:3000/users/get/${currentUser.username}`);
                                const response = await fetch(`http://localhost:3000/users/${currentUser.username}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data from JSON Server');
                }
                const user = await response.json();
                // if (user.length > 0) setUserData(user[0]); 
                if (user && Object.keys(user).length > 0)
                    setUserData(user);

            } catch (error) {
                setError(error.message);

            }
            // finally {
            //     setLoading(false);
            // }
        };
        if (currentUser.username)
            getUserData();
    }, [currentUser]);

    // if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

   return (
    <>
        <Nav />
        <h1>Info</h1>
        {userData ? (
            <>
                <div>Name: {userData.name}</div>
                <div>E-mail: {userData.email}</div>
            </>
        ) : (
            <p>Loading user info...</p>
        )}
    </>
);

};

export default Info;
