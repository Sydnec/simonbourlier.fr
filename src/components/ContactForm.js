// src/components/ContactForm.js
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactForm.module.css';

const ContactForm = () => {
  const form = useRef();
  const [icon, setIcon] = useState('fa-paper-plane');
  const [fly, setFly] = useState(false);
  const [visible, setVisible] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
      form.current,
      process.env.NEXT_PUBLIC_EMAIL_ACCOUNT_ID
    )
    .then(() => {
      animateButton();
    }, (error) => {
      console.error('Erreur lors de l\'envoi de l\'email:', error.text);
      alert('Une erreur est survenue, veuillez réessayer.');
    });
  };

  const animateButton = () => {
    const button = document.querySelector(`.${styles.contactForm} button`);
    const span = document.querySelector(`.${styles.contactForm} span`);

    setFly(true);
    setVisible(true);
    setIcon('fa-check');
    span.textContent = 'Envoyé  ';
    span.classList.add('fade');
    button.classList.add('done');

    // Réinitialiser le bouton après 2 secondes
    setTimeout(() => {
      setFly(false);
      setVisible(false);
      setIcon('fa-paper-plane');
      span.textContent = 'Envoyer';
      span.classList.remove('fade');
      button.classList.remove('done');
      form.current.reset(); 
    }, 2000);
  };

  return (
    <div id="contact" className={`section ${styles.contactSection}`}>
      <h2>Contact</h2>
      <form ref={form} onSubmit={sendEmail} className={styles.contactForm}>

        <label htmlFor="user_name">Nom</label>
        <input type="text" id="user_name" name="user_name" required />
        <label htmlFor="user_email">Email</label>
        <input type="email" id="user_email" name="user_email" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="6" required />
        <button type="submit">
          <span>Envoyer</span>
          <i className={`fa ${icon} fa-lg ${styles.replace}`}></i>
          <i className={`fa fa-paper-plane fa-lg ${styles.plane} ${fly ? styles.fly : ''} ${visible ? styles.visible : styles.hidden}`}></i>
        </button>
      </form>
      <p className={styles.contactInfo}>
        Vous pouvez également me contacter directement à <a href="mailto:contact@simonbourlier.fr">contact@simonbourlier.fr</a>.
      </p>
    </div>
  );
};

export default ContactForm;
