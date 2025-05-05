// src/components/About.js
import styles from "../styles/About.module.css";
import Image from 'next/image';

const About = () => {
  return (
    <div id="about" className={`section ${styles.aboutSection}`}>
      <h2>A propos</h2>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <p className={styles.accroche}>
            Le sport, c'est avant tout des histoires humaines. Des instants de grâce, de dépassement, de victoire et parfois de déception. C'est ce qui m'a toujours fasciné et ce que j'aime capturer à travers mon objectif.
          </p>

          <div className={styles.pointsForts}>
            <div className={styles.point}>
              <i className="fas fa-running"></i>
              <p>Passionné par l'énergie brute et les émotions intenses du sport, je me suis spécialisé dans la photographie sportive depuis 2018.</p>
            </div>
            <div className={styles.point}>
              <i className="fas fa-trophy"></i>
              <p>Des petits tournois locaux aux grandes compétitions, chaque événement est une nouvelle aventure à immortaliser.</p>
            </div>
            <div className={styles.point}>
              <i className="fas fa-camera"></i>
              <p>Mon approche ? Être au bon endroit, au bon moment, pour saisir l'authenticité de chaque instant.</p>
            </div>
          </div>

          <p className={styles.conclusion}>
            Que ce soit pour une compétition, un tournoi ou une séance personnalisée, je m'efforce toujours de capturer l'essence même du sport et des sportifs que je photographie.
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
          <div className={styles.location}>
            <i className="fas fa-map-marker-alt"></i>
            <span>Basé à Alès (30)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
