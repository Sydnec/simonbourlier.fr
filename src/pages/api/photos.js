// src/pages/api/photos.js
import axios from 'axios';

const apiKey = process.env.FLICKR_API_KEY;
const userId = process.env.FLICKR_USER_ID;
const albumId = process.env.FLICKR_ALBUM_ID;

const fetchPhotos = async (retryCount = 0) => {
  try {
    const response = await axios.get(
      'https://www.flickr.com/services/rest/',
      {
        params: {
          method: 'flickr.photosets.getPhotos',
          api_key: apiKey,
          user_id: userId,
          photoset_id: albumId,
          format: 'json',
          nojsoncallback: 1,
        },
        headers: {
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        },
      }
    );
    const photos = response.data.photoset.photo;

    // Récupérer les tailles pour chaque photo
    const photosWithSizes = await Promise.all(
      photos.map(async (photo) => {
        const sizes = await fetchPhotoSizes(photo.id);
        return { ...photo, sizes };
      })
    );

    return photosWithSizes;
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount < 3) {
      const retryAfter = error.response.headers['retry-after'] || 1;
      console.log(
        `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, retryAfter * 1000)
      );
      return fetchPhotos(retryCount + 1);
    } else {
      throw error;
    }
  }
};

const fetchPhotoSizes = async (photoId) => {
  try {
    const response = await axios.get(
      'https://www.flickr.com/services/rest/',
      {
        params: {
          method: 'flickr.photos.getSizes',
          api_key: apiKey,
          photo_id: photoId,
          format: 'json',
          nojsoncallback: 1,
        },
        headers: {
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        },
      }
    );
    return response.data.sizes.size;
  } catch (error) {
    console.error('Erreur lors de la récupération des tailles de la photo:', error.message);
    throw error;
  }
};

export default async (req, res) => {
  try {
    const photos = await fetchPhotos();
    res.status(200).json(photos);
  } catch (error) {
    console.error('Erreur lors de la récupération des photos:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des photos' });
  }
};
