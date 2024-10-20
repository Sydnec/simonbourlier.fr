// src/pages/index.js
import Head from 'next/head';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import ContactForm from '../components/ContactForm';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/HeroSection';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Simon Bourlier | Photographe sportif</title>
                <meta
                    name="description"
                    content="Bienvenue sur mon site vitrine de photographie"
                />
            </Head>
            <HeroSection />
            <About />
            <Gallery />
            <Pricing />
            <ContactForm />
            <ScrollToTop />
        </div>
    );
}
