import React from 'react';
import { Link } from 'react-router-dom';  // Импортируем Link
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
          <Link to="/">Home</Link>  {/* Используем Link вместо обычного <a> */}
          <Link to="/favorites">Favorites</Link>  {/* Используем Link для Favorites */}
          <Link to="/registration">Registration</Link>  {/* И для Registration */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
