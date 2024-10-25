// src/components/Footer.js
import { useState } from "react";
import LegalModal from "./LegalModal";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2024 Simon Bourlier. Tous droits réservés.</p>
        <a onClick={handleOpenModal} className={styles.legalButton}>
          Mentions légales
        </a>
        <LegalModal show={showModal} onClose={handleCloseModal}>
          <section>
            <h3>Éditeur du site</h3>
            <p>
            Nom : Simon Bourlier{/*, entrepreneur individuel */}
              <br />
              Adresse : 9 rue Jan Castagno, 30100 Alès, France
              <br />
              Téléphone : +33 6 49 59 21 29
              <br />
              Email : contact@simonbourlier.fr
              {/* <br />
              Numéro SIRET : 123 456 789 00010 */}
            </p>
          </section>
          <section>
            <h3>Hébergement du site</h3>
            <p>
              Raison sociale : Vercel Inc.
              <br />
              Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              <br />
              Téléphone : +1 559 288 7060
            </p>
          </section>
          <section>
            <h3>Propriété intellectuelle</h3>
            <p>
              Les contenus présents sur ce site (textes, images, photographies,
              vidéos, etc.) sont protégés par le droit d&apos;auteur. Toute
              reproduction, représentation, modification, publication,
              adaptation de tout ou partie des éléments du site, quel que soit
              le moyen ou le procédé utilisé, est interdite, sauf autorisation
              écrite préalable de Simon Bourlier.
            </p>
          </section>
        </LegalModal>
      </div>
    </footer>
  );
}
