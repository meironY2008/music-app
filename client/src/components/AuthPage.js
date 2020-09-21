import React from 'react'

export default function AuthPage({ isLoggedIn }) {
    if (isLoggedIn) {
        return ( <Redirect to="/" /> );
    } else {
        return ( <h3>Log-in Please</h3> );
    };
}