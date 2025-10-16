import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import styles from "../styles/PhotosIntro.module.css";

export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const response = await fetch(`${apiUrl}/events`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    const events = await response.json();
    
    return {
      props: {
        events: events || [],
      },
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      props: {
        events: [],
      },
    };
  }
}

export default function Photos({ events }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Photos Événementielles | Simon Bourlier</title>
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
              Chaque exploit sportif mérite d&apos;être immortalisé. Les photos
              sont proposées à <strong>prix libre</strong> pour que chacun
              puisse garder un souvenir, quels que soient ses moyens.
            </p>
            <h3>La démarche</h3>
            <p>
              Avec le système de prix libre, chacun choisit le montant qui lui
              semble juste. L&apos;objectif étant que personne ne se prive de
              souvenirs pour des raisons financières. Prix indicatif habituel :{" "}
              <strong>5€ la photo/30€ le pack</strong> contenant toutes les photos d&apos;un athlète.
            </p>
            <p>
              Votre <strong>fair-play</strong> permet de maintenir cette 
              accessibilité pour tous les participants.
            </p>
            <h3>Comment ça fonctionne ?</h3>
            <ol className={styles.steps}>
              <li>
                Parcourir la galerie pour visualiser ses photos (filtre par
                dossard)
              </li>
              <li>Choisir sa contribution sur la page de paiement</li>
              <li>
                Recevoir l&apos;accès pour télécharger toutes les photos en
                haute qualité
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
              {events.length === 0 ? (
                <p className={styles.noEvents}>Aucun événement disponible pour le moment.</p>
              ) : (
                events.map((event) => (
                  <Link
                    key={event.slug}
                    href={`/${event.slug}`}
                    className={styles.eventCard}
                  >
                    <h4>{event.name}</h4>
                    <span className={styles.eventButton}>Voir la galerie →</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
