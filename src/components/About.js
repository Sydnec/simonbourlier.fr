// src/components/About.js
import styles from "../styles/About.module.css";
import Image from 'next/image';

const About = () => {
  return (
    <div id="about" className={`section ${styles.aboutSection}`}>
      <h2>A propos</h2>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <p>
            Je m&apos;appelle Simon Bourlier et je me suis pris de
            passion pour la photographie en 2018. À ce moment-là, j&apos;étais
            alors au lycée et j&apos;ai eu l&apos;occasion d&apos;immortaliser
            le tournoi de volleyball annuel. Ce premier pas dans la photographie
            sportive a été un déclic, j&apos;ai tout de suite pris énormément de
            plaisir à immortaliser ces infimes instants de joie, de rage, de
            concentration extrême, d&apos;esprit d&apos;équipe et tout ce qui
            anime un sportif.
            <br />
            <br />
            Par la suite, ayant grandi à côté du Mans et du mythique
            circuit des 24 heures, il était impensable de ne pas photographier
            ces femmes et ces hommes, donnant tout pour leur sport et repoussant
            les limites. Ainsi, j&apos;ai découvert le plaisir de sublimer leurs
            exploits en transmettant de la meilleure des manières la vitesse
            impressionnante à laquelle je les ai vus passer durant toute mon
            enfance.{" "}
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/images/photo.jpg"
            alt="Simon Bourlier"
            width={500}
            height={500}
            className={styles.photo}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
