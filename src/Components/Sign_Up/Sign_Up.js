import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // API Call to register user
        const { name, phone, email, password } = form;
        console.log(name, phone, email, password)
        if (!name || !phone || !email || !password) {
            setShowerr('Please fill in all fields.');
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setShowerr('Please enter a valid email.');
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            setShowerr('Phone number must be exactly 10 digits.');
            return;
        }
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json(); // Parse the response JSON
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (<div className="container" style={{ marginTop: "5%" }}>
        <div className="signup-grid">
            <div className="signup-text">
                <h1>Sign Up</h1>
            </div>
            <div className="signup-text1" style={{ textAlign: "left" }}>
                Already a member? <span><a href="/login" style={{ color: "#2190FF" }}> Login</a></span>
            </div>
            <div className="signup-form">
                <form method="POST" onSubmit={register}>

                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" value={form.name}
                            onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" value={form.phone}
                            onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required className="form-control" placeholder="Enter your email" aria-describedby="helpId" value={form.email}
                            onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" value={form.password}
                            onChange={handleChange} />
                    </div>
                    {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}

                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                        <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default Sign_Up;