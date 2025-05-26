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
    
    const updateWidth = () => {
      const galleryElement = document.querySelector(`.${styles.gallery}`);
      if (galleryElement) {
        setContainerWidth(galleryElement.offsetWidth);
        setIsMobile(window.innerWidth <= 500);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const photoRows = useMemo(() => {
    if (!photos.length) return [];
    
    if (isMobile) {
      return photos.map((photo, index) => {
        const largeSize = photo.sizes.find(size => size.label === 'Large');
        if (!largeSize) return [];
        return [{ ...photo, index, width: 300, height: 200}];
      });
    }
    
    const rows = [];
    let currentRow = [];
    const targetRowHeight = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--gallery-image-height').replace('px', '')) || 200;
    const gap = parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue('--gallery-image-gap').replace('px', '')) || 2;
    
    const availableWidth = containerWidth - (gap * 2);
    
    let currentRowWidth = 0;
    
    const photosWithDimensions = photos.map((photo, index) => {
      const largeSize = photo.sizes.find(size => size.label === 'Large');
      if (!largeSize) return null;
      
      const originalWidth = parseInt(largeSize.width);
      const originalHeight = parseInt(largeSize.height);
      const aspectRatio = originalWidth / originalHeight;
            
      const imgHeight = targetRowHeight;
      const imgWidth = imgHeight * aspectRatio;
      
      return { ...photo, index, width: imgWidth, height: imgHeight};
    }).filter(Boolean);
    
    photosWithDimensions.forEach((photo) => {
      if (currentRow.length === 0 || 
          (currentRowWidth + photo.width + (currentRow.length * gap) < availableWidth)) {
        currentRow.push(photo);
        currentRowWidth += photo.width;
      } else {
        rows.push([...currentRow]);
        currentRow = [photo];
        currentRowWidth = photo.width;
      }
    });
    
    if (currentRow.length > 1) {
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

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex]?.sizes.find(s => s.label === 'Large')?.source : null;

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
                    ...(isMobile && {
                      width: '100%',
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
