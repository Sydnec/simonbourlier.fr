// src/components/Pricing.js
import styles from '../styles/Pricing.module.css';

const Pricing = () => {
  return (
    <div id="pricing" className={styles.pricingSection}>
      <h2>Tarifs</h2>
      <div className={styles.pricingContainer}>
        <div className={styles.pricingCard}>
          <h3>Match</h3>
          <ul className={styles.descriptionList}>
            <li>Description du tarif 1</li>
            <li>Description du tarif 1</li>
            <li>Description du tarif 1</li>
            <li>Description du tarif 1</li>
            <li>Description du tarif 1</li>
          </ul>
          <p className={styles.price}>A partir de 130€</p>
        </div>
        <div className={styles.pricingCard}>
          <h3>Évènement</h3>
          <ul className={styles.descriptionList}>
            <li>Description du tarif 2</li>
            <li>Description du tarif 2</li>
            <li>Description du tarif 2</li>
            <li>Description du tarif 2</li>
            <li>Description du tarif 2</li>
          </ul>
          <p className={styles.price}>A partir de 250€</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
