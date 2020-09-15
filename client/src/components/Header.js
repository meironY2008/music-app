import React from "react";
//import './Header.css';
import {Link} from 'react-router-dom';
import logo from './logo-name.png';

export default function Header() {
  return (
    <div className="header">
        <Link to='/'><img src={logo} id="logo" alt="logo" /></Link>
      <a
        className="link"
        href="https://github.com/meiromY2008"
        target="_blank"
        rel="noopener noreferrer"
      >
        @meironY2008 on GitHub
      </a>
    </div>
  );
}
