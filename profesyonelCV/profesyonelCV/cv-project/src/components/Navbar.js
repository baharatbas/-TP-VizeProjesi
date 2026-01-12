import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
    <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" onClick={handleNavClick}>
            <h2>Profesyonel CV</h2>
          </Link>
          
          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Anasayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Hakkımızda
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                İletişim
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/chatbot" 
                className={`nav-link nav-link-cta ${isActive('/chatbot') ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                CV Hazırlama
              </Link>
            </li>
      </ul>
        </div>
    </nav>
    </header>
  );
};

export default Navbar;
