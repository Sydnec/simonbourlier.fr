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
      <ul className={styles.menu}>
        <li><a href="#about" onClick={scrollToSection}>A propos</a></li>
        <li><a href="#gallery" onClick={scrollToSection}>Galerie</a></li>
        <li className={styles.logoContainer}>
          <a href="#heroSection" onClick={scrollToSection} className={styles.logo}>
            <Image
              src="/images/blanc.png"
              alt="Logo"
              fill
              style={{ objectFit: 'contain' }}
              className={styles.logoImage}
            />
          </a>
        </li>
        <li><a href="#pricing" onClick={scrollToSection}>Tarifs</a></li>
        <li><a href="#contact" onClick={scrollToSection}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
