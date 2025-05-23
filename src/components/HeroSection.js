// src/components/HeroSection.js
import { useEffect, useState } from "react";
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToSection = (e) => {
    e.preventDefault();
    const aboutLink = document.querySelector('a[href="#about"]');
    if (aboutLink) {
      aboutLink.click();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div id="heroSection" className={styles.heroSection}>
      <div className={styles.background}>
        <div className={styles.overlay}>
          <h1>Simon Bourlier</h1>
          <h2>Photographe Sportif</h2>
        </div>
      </div>
      <a
        href="#about"
        className={`${styles.cta} ${isVisible ? styles.visible : ""}`}
        onClick={scrollToSection}
      >
        <span className={styles.scrollText}>Me découvrir</span>
        <span className={styles.arrow}></span>
      </a>
    </div>
  );
};

export default HeroSection;
