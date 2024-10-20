// src/components/HeroSection.js
import styles from "../styles/HeroSection.module.css";

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.background}>
        <div className={styles.overlay}>
          <h1>Simon Bourlier</h1>
          <p>Photographe sportif</p>
        </div>
      </div>
      <a className={styles.cta} onClick={scrollToAbout}>
        <span className={styles.scrollText}>Me découvrir</span>
        <span className={styles.arrow}></span>
      </a>
    </div>
  );
};

export default HeroSection;
