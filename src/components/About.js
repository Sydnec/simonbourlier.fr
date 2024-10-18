// src/components/About.js
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div id="about" className={styles.aboutSection}>
      <h2>À propos</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src="/images/photo2.jpg"
            alt="Simon Bourlier"
            className={styles.photo}
          />
        </div>
        <div className={styles.textContainer}>
          <p>
            Je suis un photographe passionné par le sport, capturant des moments uniques et dynamiques. Mon travail se concentre sur l'énergie et l'émotion des événements sportifs, offrant des images qui racontent une histoire.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
