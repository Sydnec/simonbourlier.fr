// src/components/Gallery.js
import { useEffect, useState, useMemo } from 'react';
import Modal from './Modal';
import styles from '../styles/Gallery.module.css';
import Image from 'next/image';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    
    // Mettre à jour la largeur du conteneur
    const updateWidth = () => {
      const gallery = document.getElementById('gallery');
      if (gallery) {
        setContainerWidth(gallery.offsetWidth);
        setIsMobile(window.innerWidth <= 500);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Organiser les photos en rangées
  const photoRows = useMemo(() => {
    if (!photos.length) return [];
    
    // Sur mobile, chaque photo est dans sa propre rangée avec ratio adapté selon l'orientation
    if (isMobile) {
      return photos.map((photo, index) => {
        const largeSize = photo.sizes.find(size => size.label === 'Large');
        if (!largeSize) return [];
        
        // Déterminer l'orientation réelle de l'image
        const width = parseInt(largeSize.width);
        const height = parseInt(largeSize.height);
        const isLandscape = width > height;
        
        // Calculer les dimensions en fonction de l'orientation
        // Pour les images verticales, on part de la largeur pour garantir le ratio 2/3
        if (isLandscape) {
          // Pour les images horizontales, ratio 3/2
          const imgHeight = 200;
          const imgWidth = imgHeight * 3/2;
          return [{ ...photo, index, width: imgWidth, height: imgHeight, isLandscape }];
        } else {
          // Pour les images verticales, ratio 2/3
          // On fixe la largeur et on calcule la hauteur pour avoir un ratio 2/3
          const imgWidth = 300; // Largeur fixe
          const imgHeight = imgWidth * 3/2; // Hauteur = largeur * 3/2 pour obtenir un ratio 2/3 (h/w)
          return [{ ...photo, index, width: imgWidth, height: imgHeight, isLandscape }];
        }
      });
    }
    
    // Sur PC, organisation normale en rangées
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
      
      // Si c'est la première image de la rangée ou s'il reste de la place
      if (currentRow.length === 0 || 
          (currentRowWidth + imgWidth + (currentRow.length * gap) < containerWidth)) {
        currentRow.push({ ...photo, index, width: imgWidth, height: imgHeight });
        currentRowWidth += imgWidth;
      } else {
        // Ajouter la rangée complète et commencer une nouvelle rangée
        rows.push([...currentRow]);
        currentRow = [{ ...photo, index, width: imgWidth, height: imgHeight }];
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
                    flex: `${photo.width} ${photo.width}px`,
                    ...(isMobile && photo.isLandscape !== undefined && {
                      width: '100%', // Même largeur pour toutes les photos
                      aspectRatio: photo.isLandscape ? 3/2 : 2/3
                    })
                  }}
                >
                  <Image
                    src={largeSize.source}
                    alt={photo.title}
                    width={photo.width}
                    height={photo.height}
                    className={styles.photo}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
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
