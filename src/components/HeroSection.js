import { useEffect, useState } from "react";
import styles from "../styles/HeroSection.module.css";
import Image from "next/image";

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
        <Image
          src="/images/background.jpg"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          priority
        />
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
