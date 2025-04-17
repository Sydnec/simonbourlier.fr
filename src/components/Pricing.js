// src/components/Pricing.js
import {
    FaCamera,
    FaImage,
    FaRegCalendarAlt,
    FaDesktop,
    FaCar
} from 'react-icons/fa';
import styles from '../styles/Pricing.module.css';

const Pricing = () => {
    return (
        <div id="pricing" className={`section ${styles.pricingSection}`}>
            <h2>Tarifs</h2>
            <div className={styles.pricingContainer}>
                <div className={styles.pricingCard}>
                    <h3>Formule &quot;Match&quot;</h3>
                    <ul className={styles.descriptionList}>
                        <li><FaCamera size={16} /> 1h30 de prise de vue</li>
                        <li><FaImage size={16} /> 20 photos retouchées *</li>
                        <li><FaRegCalendarAlt size={16} /> Livrées sous 72h</li>
                        <li><FaDesktop size={16} /> Au format numérique</li>
                        <li><FaCar size={16} /> 0,50€/km au-delà de 30 km</li>
                    </ul>
                    <p className={styles.price}>À partir de 130€</p>
                </div>
                <div className={styles.pricingCard}>
                    <h3>Formule &quot;Évènement&quot;</h3>
                    <ul className={styles.descriptionList}>
                        <li><FaCamera size={16} /> 4h de prise de vue</li>
                        <li><FaImage size={16} /> 50 photos retouchées *</li>
                        <li><FaRegCalendarAlt size={16} /> Livrées sous 72h</li>
                        <li><FaDesktop size={16} /> Au format numérique</li>
                        <li><FaCar size={16} /> 0,50€/km au-delà de 30 km</li>
                    </ul>
                    <p className={styles.price}>À partir de 250€</p>
                </div>
            </div>
            <p className={styles.note}>
                * Nombre de photos minimum garanti, des photos supplémentaires peuvent être livrées.
            </p>
        </div>
    );
};

export default Pricing;
