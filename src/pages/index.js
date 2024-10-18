// src/pages/index.js
import Head from 'next/head';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import ContactForm from '../components/ContactForm';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Simon Bourlier | Photographe sportfi</title>
                <meta
                    name="description"
                    content="Bienvenue sur mon site vitrine de photographie"
                />
            </Head>
            <div className={styles.background}>
                <div className={styles.overlay}>
                    <h1>Simon Bourlier</h1>
                    <p>Photographe sportif</p>
                </div>
            </div>
            <a href="#about" className={styles.cta}>
                <span className={styles.scrollText}>Me découvrir</span>
                <span className={styles.arrow}></span>
            </a>
            <About />
            <Gallery />
            <Pricing />
            <ContactForm />
        </div>
    );
}
