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
      setLoading(false);
      animateButton();
      form.current.reset(); 
    }, (error) => {
      console.error('Erreur lors de l\'envoi de l\'email:', error.text);
      alert('Une erreur est survenue, veuillez réessayer.');
      setLoading(false);
    });
  };

  const animateButton = () => {
    const button = document.querySelector(`.${styles.contactForm} button`);
    const plane = document.querySelector(`.${styles.plane}`);
    const replace = document.querySelector(`.${styles.replace}`);
    const span = document.querySelector(`.${styles.contactForm} span`);

    plane.classList.add(styles.fly);
    plane.classList.add(styles.visible);
    replace.classList.remove('fa-paper-plane');
    replace.classList.add('fa-check');
    span.textContent = 'Envoyé';
    span.classList.add(styles.fade);
    button.classList.add(styles.done);

    // Réinitialiser le bouton après 2 secondes
    setTimeout(() => {
      plane.classList.remove(styles.fly, styles.visible);
      replace.classList.remove('fa-check');
      replace.classList.add('fa-paper-plane');
      span.textContent = 'Envoyer';
      span.classList.remove(styles.fade);
      button.classList.remove(styles.done);
    }, 2000);
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
          <span>{loading ? 'Envoi en cours...' : 'Envoyer'}</span>
          <i className={`fa fa-paper-plane fa-lg ${styles.replace}`}></i>
          <i className={`fa fa-paper-plane fa-lg ${styles.plane} ${styles.hidden}`}></i>
        </button>
      </form>
      <p className={styles.contactInfo}>
        Si le formulaire ne fonctionne pas, vous pouvez me contacter directement à <a href="mailto:contact@simonbourlier.fr">contact@simonbourlier.fr</a>.
      </p>
    </div>
  );
};

export default ContactForm;
