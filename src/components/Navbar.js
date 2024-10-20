// src/components/Navbar.js
import { useEffect, useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const heroSection = document.getElementById('heroSection');
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (window.pageYOffset > heroBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isVisible ? styles.visible : ''}`}>
      <ul>
        <li><a href="#about" onClick={scrollToSection}>A propos</a></li>
        <li><a href="#gallery" onClick={scrollToSection}>Galerie</a></li>
        <li><a href="#pricing" onClick={scrollToSection}>Tarifs</a></li>
        <li><a href="#contact" onClick={scrollToSection}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
