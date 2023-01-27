import { useState, useEffect } from 'react';
import Header from '../inc/Header';

function Home() {
    const [islogged, setIsLogged] = useState(false);
    const username = JSON.parse(window.localStorage.getItem('user-info'));
    useEffect(() => {
        if (window.localStorage.getItem('user-info') === null) {
            setIsLogged(true);
        }
    });
    const renderLoogedOut = (
        <>
            <h2>Welcome {localStorage.getItem('user-info') ? username.name : ""}</h2>
            <p>Thank you for taking the time to login. I hope you enjoy my application.<br />Now that we are logged in you can take a look around.</p>
        </>
    );
    const renderLoogedIn = (
        <div>
            <h2>Welcome to Polok's Scheduler</h2>
            <p>In order to continue please register a new user or use the following user to login</p>
            <p>User Email: test@example.com<br />Password: testing123</p>
        </div>
    );
    return (
        <>
        
        <Header />
            {localStorage.getItem('user-info') ? renderLoogedOut : renderLoogedIn}
        </>
    );
}

export default Home;
