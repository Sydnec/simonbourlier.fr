// src/components/About.js
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div id="about" className={`section ${styles.aboutSection}`}>
      <h2>A propos</h2>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <p>
          Je m'appelle Simon Bourlier et je me suis pris de passion pour la photographie en 2018. À ce moment-là, j'étais alors au lycée et j'ai eu l'occasion d'immortaliser le tournoi de volleyball annuel. Ce premier pas dans la photographie sportive a été un déclic, j'ai tout de suite pris énormément de plaisir à immortaliser ces infimes instants de joie, de rage, de concentration extrême, d'esprit d'équipe et tout ce qui anime un sportif.
          <br/>
          <br/>
          Par la suite, ayant grandi à côté du Mans et du mythique circuit des 24 heures, il était impensable de ne pas photographier ces femmes et ces hommes, donnant tout pour leur sport et repoussant les limites. Ainsi, j'ai découvert le plaisir de sublimer leurs exploits en transmettant de la meilleure des manières la vitesse impressionnante à laquelle je les ai vus passer durant toute mon enfance.          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src="/images/photo.jpg"
            alt="Simon Bourlier"
            className={styles.photo}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
