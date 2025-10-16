import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventGallery from "../../components/EventGallery";
import Footer from "../../components/Footer";
import styles from "../../styles/EventPage.module.css";

export async function getServerSideProps(context) {
  const { eventSlug } = context.params;
  
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    // Vérifier que l'événement existe
    const eventsResponse = await fetch(`${apiUrl}/events`);
    if (!eventsResponse.ok) {
      return {
        notFound: true,
      };
    }
    
    const events = await eventsResponse.json();
    const event = events.find(e => e.slug === eventSlug);
    
    if (!event) {
      return {
        notFound: true,
      };
    }
    
    return {
      props: {
        event,
      },
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return {
      notFound: true,
    };
  }
}

export default function EventPage({ event }) {
  const router = useRouter();
  const { eventSlug } = router.query;

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
        <title>{event.name} | Simon Bourlier</title>
        <meta
          name="description"
          content={`Retrouvez toutes les photos du ${event.name}. Recherchez vos photos par numéro de dossard.`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{event.name}</h1>
        </div>
        <EventGallery 
          eventSlug={eventSlug} 
          stripeCheckoutUrl={event.stripeCheckoutUrl}
        />
      </main>

      <Footer />
    </div>
  );
}
