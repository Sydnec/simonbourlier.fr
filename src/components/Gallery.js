// src/components/Gallery.js
import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from '../styles/Gallery.module.css';
import Image from 'next/image';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  const openModal = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div id="gallery" className={`section ${styles.gallerySection}`}>
      <h2>Galerie</h2>
      <div className={styles.gallery}>
      {photos.map((photo) => {
          const largeSize = photo.sizes.find(size => size.label === 'Large');
          const originalSize = photo.sizes.find(size => size.label === 'Large 2048');
          return (
            <div key={photo.id} className={styles.photoContainer} onClick={() => openModal(originalSize.source)}>
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
      <Modal isOpen={!!selectedPhoto} onClose={closeModal} photo={selectedPhoto} />
    </div>
  );
};

export default Gallery;
