import React from 'react'
import "../Navbar.css";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div>
          <div className="logo"> LOGO </div>
        </div>
        <div className="list">
        <ul className="links">
            <li><Link href="/">About us</Link></li>
            <li><Link href="SignUp">Sign Up</Link></li>
            <li><Link href="">Login</Link></li>
        </ul>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
    </>
  );
}

export default Navbar