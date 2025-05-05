// src/components/Gallery.js
import { useEffect, useState, useMemo } from 'react';
import Modal from './Modal';
import styles from '../styles/Gallery.module.css';
import Image from 'next/image';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

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
    
    const updateWidth = () => {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        setContainerWidth(gallery.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Organiser les photos en rangées avec un ratio respecté
  const photoRows = useMemo(() => {
    if (!photos.length || containerWidth === 0) return [];
    
    const rows = [];
    let currentRow = [];
    const targetRowHeight = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--gallery-image-height').replace('px', '')) || 200;
    const gap = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--gallery-image-gap').replace('px', '')) || 2;
    
    // Calculer la largeur disponible (en tenant compte du padding)
    const availableWidth = containerWidth - (2 * 24); // 24px de padding de chaque côté
    
    let currentRowWidth = 0;
    
    photos.forEach((photo, index) => {
      const largeSize = photo.sizes.find(size => size.label === 'Large');
      if (!largeSize) return;
      
      // Calculer les dimensions en maintenant le ratio
      const aspectRatio = largeSize.width / largeSize.height;
      const imgHeight = targetRowHeight;
      const imgWidth = imgHeight * aspectRatio;
      
      // Calculer la largeur totale avec l'image actuelle
      const totalWidth = currentRowWidth + (currentRow.length > 0 ? gap : 0) + imgWidth;
      
      if (currentRow.length === 0 || totalWidth <= availableWidth) {
        currentRow.push({ 
          ...photo, 
          index, 
          width: imgWidth, 
          height: imgHeight,
          aspectRatio 
        });
        currentRowWidth = totalWidth;
      } else {
        // Ajouter la rangée complète
        rows.push([...currentRow]);
        // Commencer une nouvelle rangée avec l'image actuelle
        currentRow = [{ 
          ...photo, 
          index, 
          width: imgWidth, 
          height: imgHeight,
          aspectRatio 
        }];
        currentRowWidth = imgWidth;
      }
    });
    
    // Ajouter la dernière rangée si elle n'est pas vide
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    return rows;
  }, [photos, containerWidth]);

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
        {photoRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.galleryRow}>
            {row.map((photo) => {
              const largeSize = photo.sizes.find(size => size.label === 'Large');
              if (!largeSize) return null;
              
              return (
                <div 
                  key={photo.id}
                  className={styles.photoContainer}
                  onClick={() => openModal(photo.index)}
                  style={{
                    aspectRatio: photo.aspectRatio,
                    flex: '1 1 auto'
                  }}
                >
                  <Image
                    src={largeSize.source}
                    alt={photo.title}
                    fill
                    className={styles.photo}
                    sizes={`(max-width: 768px) 100vw, ${100 / row.length}%`}
                  />
                </div>
              );
            })}
          </div>
        ))}
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
