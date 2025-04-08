// src/pages/index.js
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import Customers from '../components/Customers';
import ContactForm from '../components/ContactForm';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Simon Bourlier | Photographe sportif</title>
                <meta
                    name="description"
                    content="Bienvenue sur mon site vitrine de photographie"
                />
                <meta
                    property="og:title"
                    content="Simon Bourlier - Photographe"
                />
                <meta
                    property="og:description"
                    content="Je m'appelle Simon Bourlier et je me suis pris de passion pour la photographie en 2018. À ce moment-là, j'étais alors au lycée et j'ai eu l'occasion d'immortaliser le tournoi de volleyball annuel. Ce premier pas dans la photographie sportive a été un déclic, j'ai tout de suite pris énormément de plaisir à immortaliser ces infimes instants de joie, de rage, de concentration extrême, d'esprit d'équipe et tout ce qui anime un sportif. Par la suite, ayant grandi à côté du Mans et du mythique circuit des 24 heures, il était impensable de ne pas photographier ces femmes et ces hommes, donnant tout pour leur sport et repoussant les limites. Ainsi, j'ai découvert le plaisir de sublimer leurs exploits en transmettant de la meilleure des manières la vitesse impressionnante à laquelle je les ai vus passer durant toute mon enfance."
                />
                <meta
                    property="og:image"
                    content="https://simonbourlier.fr/public/images/background-min.jpg"
                />
                <meta property="og:url" content="https://simonbourlier.fr" />
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
