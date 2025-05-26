import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Customers.module.css';

const Customers = () => {
    const [logos, setLogos] = useState([]);

    useEffect(() => {
        fetch('/api/customers')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Erreur réseau lors de la récupération des logos');
                }
                return res.json();
            })
            .then(data => {
                setLogos(data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des logos:', error);
            });
    }, []);

    return (
        <div id="customers" className={`section ${styles.customersSection}`}>
            <h2>Ils m&apos;ont fait confiance</h2>
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
