import { useEffect } from "react";
import Head from "next/head";
import TriathlonGallery from "../../components/TriathlonGallery";
import Footer from "../../components/Footer";
import styles from "../../styles/TriathlonPage.module.css";

export default function TriathlonCevennes2025() {
  useEffect(() => {
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e) => {
      if (
        (e.ctrlKey && (e.key === "s" || e.key === "c" || e.key === "p")) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const preventSelection = () => {
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.body.style.mozUserSelect = "none";
      document.body.style.msUserSelect = "none";
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventKeyboardShortcuts);
    preventSelection();

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
      document.body.style.userSelect = "auto";
      document.body.style.webkitUserSelect = "auto";
      document.body.style.mozUserSelect = "auto";
      document.body.style.msUserSelect = "auto";
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Duathlon des Cévennes 2025 | Simon Bourlier</title>
        <meta
          name="description"
          content="Retrouvez toutes les photos du Duathlon des Cévennes 2025. Recherchez vos photos par numéro de dossard."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Duathlon des Cévennes 2025</h1>
        </div>
        <TriathlonGallery />
      </main>

      <Footer />
    </div>
  );
}
