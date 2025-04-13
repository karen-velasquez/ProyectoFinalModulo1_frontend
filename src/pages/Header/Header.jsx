import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/mistareas.png';




const Header = ({ openModal }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado para manejar el menú móvil

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Alterna el estado del menú móvil
  };

  return (
    <header className="header-outer">
      <div className="header-inner responsive-wrapper">
        <div className="header-logo">
        <img src={logo} alt="Logo" />
 
        </div>

        <nav className={`header-navigation ${isMobileMenuOpen ? 'active' : ''}`}>


          {/* Enlaces de acción */}
          <a href="#" onClick={openModal} className="header-action-link">
            Registrar Nueva Tarea
          </a>

          <a href="#" onClick={handleLogout} className="header-action-link">
            Cerrar sesión
          </a>
        </nav>

        {/* Icono del menú para móviles */}
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          &#9776; {/* Icono del menú */}
        </button>
      </div>
    </header>
  );
};

export default Header;
