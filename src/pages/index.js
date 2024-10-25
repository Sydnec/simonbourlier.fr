// src/pages/index.js
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Pricing from "../components/Pricing";
import ContactForm from "../components/ContactForm";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Simon Bourlier | Photographe sportif</title>
        <meta
          name="description"
          content="Bienvenue sur mon site vitrine de photographie"
        />
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <About />
        <Gallery />
        <Pricing />
        <ContactForm />
        <ScrollToTop />
        <Footer />
      </main>
    </div>
  );
}
