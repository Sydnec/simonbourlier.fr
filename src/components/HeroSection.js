// src/components/HeroSection.js
import { useEffect, useState } from 'react';
import styles from '../styles/HeroSection.module.css';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
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
    <div id="heroSection" className={styles.heroSection}>
      <div className={styles.background}>
      </div>
      <a href="#about" className={`${styles.cta} ${isVisible ? styles.visible : ''}`} onClick={scrollToSection}>
        <span className={styles.scrollText}>Me découvrir</span>
        <span className={styles.arrow}></span>
      </a>
    </div>
  );
};

export default HeroSection;
