import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";



const Navbar = () => {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const[email,setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const handleClick = () => setClick(!click);
    const dropdownRef = useRef(null);                        // to detect outside clicks

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }

    const handleDropdownToggle = () => setShowDropdown(prev => !prev);

    useEffect(() => { 
      const storedemail = sessionStorage.getItem("email");

      if (storedemail) {
            setIsLoggedIn(true);
            setUsername(storedemail.split("@")[0]);
          }
        }, []);

         useEffect(() => {
    const handleOutsideClick = (e) => {
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showDropdown]);
  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
        StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i></Link>
        <span>.</span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search/doctors">Appointments</Link>
        </li>
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
         <Link to="/reviews">Reviews</Link>
        </li>

        {/* ▼ Profile dropdown */}
        {username && (
          <li className="link user-menu" ref={dropdownRef}>
            <p className="user-trigger" onClick={handleDropdownToggle}>
              Welcome,&nbsp;{username}{" "}
              <i className={`fa fa-chevron-${showDropdown ? "up" : "down"}`}/>
            </p>

            {showDropdown && (
              <div className="dropdown">
                <Link to="/profile" onClick={()=>setShowDropdown(false)}>Your Profile</Link>
                <Link to="/reports" onClick={()=>setShowDropdown(false)}>Your Reports</Link>
              </div>
            )}
          </li>
        )}

        {isLoggedIn?(
          <>
            <li className="link">
              <Link to="/instant-consultation">
                <button className="btn1">Instant Booking</button>
              </Link>
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
            
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/sign-up">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;