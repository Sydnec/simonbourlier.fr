// src/components/Pricing.js
import styles from '../styles/Pricing.module.css';

const Pricing = () => {
    return (
        <div id="pricing" className={`section ${styles.pricingSection}`}>
            <h2>Tarifs</h2>
            <div className={styles.pricingContainer}>
                <div className={styles.pricingCard}>
                    <h3>Match</h3>
                    <ul className={styles.descriptionList}>
                        <li>Durée de la prise de vue : 1h30</li>
                        <li>Nombre de photos retouchées : 50</li>
                        <li>Délais de livraison : Sous 72h</li>
                        <li>Livraison au format numérique</li>
                        <li>
                            Cession des droits inclus
                        </li>
                        <li>
                            Frais de déplacement : 0,50€/km au-delà de 30
                            km
                        </li>
                    </ul>
                    <p className={styles.price}>A partir de 130€</p>
                </div>
                <div className={styles.pricingCard}>
                    <h3>Évènement</h3>
                    <ul className={styles.descriptionList}>
                        <li>Durée de la prise de vue : 4h</li>
                        <li>Nombre de photos retouchées : 20</li>
                        <li>Délais de livraison : Sous 72h</li>
                        <li>Livraison au format numérique</li>
                        <li>
                            Cession des droits inclus
                        </li>
                        <li>
                            Frais de déplacement : 0,50€/km au-delà de 30
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
