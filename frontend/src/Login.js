import { useState } from 'react';

function Login({ setToken, setRole }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {

        const response = await fetch('http://localhost:5001/login', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                username,
                password
            })
        });

        const data = await response.json();

        if (data.token) {

            localStorage.setItem('token', data.token);

            localStorage.setItem('role', data.role);

            setToken(data.token);

            setRole(data.role);

            alert('Login Successful');
        }

        else {

            alert('Invalid Credentials');
        }
    };

    return (

        <div className="login-container">

            <h1>Employee Portal Login</h1>

            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={loginUser}>
                Login
            </button>

        </div>
    );
}

export default Login;