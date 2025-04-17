// src/components/Gallery.js
import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from '../styles/Gallery.module.css';
import Image from 'next/image';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (index) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex]?.sizes.find(s => s.label === 'Large 2048')?.source : null;

  return (
    <div id="gallery" className={`section ${styles.gallerySection}`}>
      <h2>Galerie</h2>
      <div className={styles.gallery}>
        {photos.map((photo, index) => {
          const largeSize = photo.sizes.find(size => size.label === 'Large');
          return (
            <div key={photo.id} className={styles.photoContainer} onClick={() => openModal(index)}>
              <Image
                src={largeSize.source}
                alt={photo.title}
                width={1920}
                height={largeSize.height * (1920 / largeSize.width)}
                className={styles.photo}
              />
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={selectedIndex !== null}
        onClose={closeModal}
        photo={selectedPhoto}
        onNext={() => setSelectedIndex((prev) => (prev + 1) % photos.length)}
        onPrev={() => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)}
      />
    </div>
  );
};

export default Gallery;
