// src/components/Navbar.js
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const scrollToSection = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const navbarHeight = document.querySelector(`.${styles.navbar}`).offsetHeight;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <a href="#heroSection" onClick={scrollToSection}>
            <Image src="/images/blanc.png" alt="Logo" layout="fill" objectFit="contain" className={styles.logoImage} />
          </a>
        </div>
        <ul className={styles.menu}>
          <li><a href="#about" onClick={scrollToSection}>A propos</a></li>
          <li><a href="#gallery" onClick={scrollToSection}>Galerie</a></li>
          <li><a href="#pricing" onClick={scrollToSection}>Tarifs</a></li>
          <li><a href="#contact" onClick={scrollToSection}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
