import React from 'react';
import { Link } from 'react-router-dom';  
import './Header.css';

function Header({ onSearch }) {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      onSearch(event.target.value);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Movie Gallery</h1>
        <nav>
          <Link to="/">Home</Link>  
          <Link to="/favorites">Favorites</Link>  
          <Link to="/registration">Registration</Link>  
        </nav>
      </div>
    </header>
  );
}

export default Header;
