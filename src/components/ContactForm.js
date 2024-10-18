// src/components/ContactForm.js
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_ID
    )
    .then((result) => {
      console.log('Email envoyé:', result.text);
      alert('Message envoyé avec succès !');
      setLoading(false);
    }, (error) => {
      console.error('Erreur lors de l\'envoi de l\'email:', error.text);
      alert('Une erreur est survenue, veuillez réessayer.');
      setLoading(false);
    });
  };

  return (
    <div id="contact" className={styles.contactSection}>
      <h2>Contact</h2>
      <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>
        <label>Nom</label>
        <input type="text" name="user_name" required />
        <label>Email</label>
        <input type="email" name="user_email" required />
        <label>Message</label>
        <textarea name="message" rows="6" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
      <p className={styles.contactInfo}>
        Si le formulaire ne fonctionne pas, vous pouvez nous contacter directement à <a href="mailto:contact@simonbourlier.fr">contact@simonbourlier.fr</a>.
      </p>
    </div>
  );
};

export default ContactForm;
