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
                        <li>Durée de la séance : 1h30 de prise de vue</li>
                        <li>Comprend : 20 photos retouchées</li>
                        <li>Format de livraison : Support numérique</li>
                        <li>Délais de livraison : Sous 72h</li>
                        <li>
                            Droits d'utilisation : Cession des droits inclus
                        </li>
                        <li>
                            Frais de déplacement : 0,3€/km au-delà de 30
                            km
                        </li>
                    </ul>
                    <p className={styles.price}>A partir de 130€</p>
                </div>
                <div className={styles.pricingCard}>
                    <h3>Évènement</h3>
                    <ul className={styles.descriptionList}>
                        <li>Durée de la séance : 4h de prise de vue</li>
                        <li>Comprend : 50 photos retouchées</li>
                        <li>Format de livraison : Support numérique</li>
                        <li>Délais de livraison : Sous 72h</li>
                        <li>
                            Droits d'utilisation : Cession des droits inclus
                        </li>
                        <li>
                            Frais de déplacement : 0,3€/km au-delà de 30
                            km
                        </li>
                    </ul>
                    <p className={styles.price}>A partir de 250€</p>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
