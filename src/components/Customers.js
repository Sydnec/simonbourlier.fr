import styles from '../styles/Customers.module.css';
import Image from 'next/image';

const logos = [
    { src: '/images/logos/RCN.png', alt: 'Rugby Club de Nîmes' },
    { src: '/images/logos/centurions.png', alt: 'Centurions de Nîmes' },
];

const Customers = () => {
    return (
        <div id="customers" className={`section ${styles.customersSection}`}>
            <h3>Ils m&apos;ont fait confiance</h3>
            <div className={styles.logoContainer}>
                {logos.map((logo, index) => (
                    <div key={index} className={styles.logo}>
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes="(max-width: 768px) 100px, 100px"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customers;
