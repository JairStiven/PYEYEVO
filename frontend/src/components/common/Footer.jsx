import React from 'react';
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h4 className="footer-logo">YeYeVo</h4>
        <p>&copy; {new Date().getFullYear()} YeYeVo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;