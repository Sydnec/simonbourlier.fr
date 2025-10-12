import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import styles from "../styles/PhotosIntro.module.css";

export default function Photos() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          Photos Événementielles - Prix Libre | Simon Bourlier Photographie
        </title>
        <meta
          name="description"
          content="Découvrez mes photos événementielles à prix libre. Une démarche basée sur la confiance et la reconnaissance du travail photographique."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>Photographie Événementielle</h1>

          <div className={styles.textContent}>
            <h2>Des souvenirs accessibles à tous</h2>
            <p>
              Vos exploits sportifs méritent d&apos;être immortalisés. Je propose mes
              photos à <strong>prix libre</strong> pour que chacun puisse garder
              un souvenir, peu importe ses moyens.
            </p>

            <h3>Ma démarche</h3>
            <p>
              Habituellement, je vends mes photos <strong>3€ l&apos;unité</strong> (à
              titre indicatif). Avec le système à prix libre, vous choisissez le
              montant qui vous semble juste. L&apos;objectif étant que personne ne se
              prive de souvenirs par manque de moyens.
            </p>
            <p>
              <strong>Je compte sur votre fair-play</strong> pour me permettre
              de continuer à offrir cette accessibilité à tous les participants.
            </p>

            <h3>Comment ça fonctionne ?</h3>
            <ol className={styles.steps}>
              <li>
                Parcourez la galerie et retrouvez vos photos (filtre par
                dossard)
              </li>
              <li>Choisissez votre contribution sur la page de paiement</li>
              <li>
                Recevez l&apos;accès pour télécharger toutes les photos en haute
                qualité
              </li>
            </ol>

            <p style={{ fontSize: "13px", marginTop: "15px", opacity: 0.8 }}>
              Un problème ? Contactez-moi :{" "}
              <a
                href="mailto:contact@simonbourlier.fr"
                style={{
                  color: "var(--light-selection-color)",
                  fontWeight: 600,
                  textDecoration: "underline",
                }}
              >
                contact@simonbourlier.fr
              </a>
            </p>

            <h3>Événements disponibles</h3>
            <div className={styles.eventsList}>
              <Link
                href="/triathlon-cevennes-2025"
                className={styles.eventCard}
              >
                <h4>Triathlon des Cévennes 2025</h4>
                <span className={styles.eventButton}>Voir la galerie →</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
