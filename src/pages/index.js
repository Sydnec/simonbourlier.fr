// src/pages/index.js
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Gallery from '../components/Gallery.js';
import Pricing from '../components/Pricing';
import Customers from '../components/Customers';
import ContactForm from '../components/ContactForm';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Simon Bourlier | Photographe Sportif à Alès (30) | Reportage Événementiel</title>
                <meta
                    name="description"
                    content="Photographe sportif professionnel basé à Alès (30), je capture l'émotion et l'intensité des événements sportifs. Spécialisé dans le reportage photo, je mets en valeur les athlètes et les compétitions dans le Gard et en Occitanie."
                />
                <meta name="keywords" content="photographe sportif Alès, reportage photo sportif Gard, photographe événementiel 30, photographie sportive Occitanie, Simon Bourlier photographe, couverture événement sportif Alès, photographe compétition sportive" />
                <meta name="author" content="Simon Bourlier" />
                <meta name="geo.region" content="FR-30" />
                <meta name="geo.placename" content="Alès" />
                <meta name="robots" content="index, follow" />
                
                <meta property="og:title" content="Simon Bourlier - Photographe Sportif à Alès (30)" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="fr_FR" />
                <meta property="og:site_name" content="Simon Bourlier Photographie" />
                <meta
                    property="og:description"
                    content="Photographe sportif professionnel à Alès, spécialisé dans le reportage événementiel et la photographie de compétition dans le Gard et en Occitanie."
                />
                <meta
                    property="og:image"
                    content="https://simonbourlier.fr/public/images/background-min.jpg"
                />
                <meta property="og:url" content="https://simonbourlier.fr" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Simon Bourlier - Photographe Sportif à Alès (30)" />
                <meta name="twitter:description" content="Photographe sportif professionnel à Alès, spécialisé dans le reportage événementiel et la photographie de compétition." />
                <meta name="twitter:image" content="https://simonbourlier.fr/public/images/background-min.jpg" />
                
                <link rel="canonical" href="https://simonbourlier.fr" />
                <link rel="alternate" hrefLang="fr" href="https://simonbourlier.fr" />
            </Head>
            <Navbar />
            <main>
                <HeroSection />
                <About />
                <Gallery />
                <Pricing />
                <Customers />
                <ContactForm />
                <ScrollToTop />
                <Footer />
            </main>
        </div>
    );
}
