import React, { useState } from "react";
import "./Sign_Up.css"

const Sign_Up = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, phone, email, password } = form;

        if (!name || !phone || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        // Success
        alert('Sign up successful!');
        // Continue with sign-up logic (e.g., API call)
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
                <form onSubmit={handleSubmit}>

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