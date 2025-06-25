import React, { useState } from "react";
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        // Success
        alert('Login successful!');
        // Proceed with login logic (e.g., API call)
    };
    return (<div className="container">
        <div className="login-grid">
            <div className="login-text">
                <h2>Login</h2>
            </div>
            <div className="login-text">
                Are you a new member? <span><a href="/sign-up" style={{ color: "#2190FF" }}> Sign Up Here</a></span>
            </div>
            <br />
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            aria-describedby="helpId"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                    <br />
                    <div className="login-text">
                        Forgot Password?
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default Login;