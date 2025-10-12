import axios from "axios";

const apiKey = process.env.FLICKR_API_KEY;
const userId = process.env.FLICKR_USER_ID;
const albumId = process.env.FLICKR_TRIATHLON_ALBUM_ID;

const fetchPhotos = async (retryCount = 0) => {
  try {
    const response = await axios.get("https://www.flickr.com/services/rest/", {
      params: {
        method: "flickr.photosets.getPhotos",
        api_key: apiKey,
        user_id: userId,
        photoset_id: albumId,
        extras: "tags,description",
        format: "json",
        nojsoncallback: 1,
      },
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
      },
    });

    if (!response.data.photoset || !response.data.photoset.photo) {
      return [];
    }

    const photos = response.data.photoset.photo;

    const photosWithSizes = await Promise.all(
      photos.map(async (photo) => {
        const sizes = await fetchPhotoSizes(photo.id);
        const dossards = extractDossards(photo.tags);

        return {
          ...photo,
          sizes,
          dossards,
          price: 5.0,
        };
      })
    );

    return photosWithSizes;
  } catch (error) {
    if (error.response && error.response.status === 429 && retryCount < 3) {
      const retryAfter = error.response.headers["retry-after"] || 1;
      console.log(
        `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return fetchPhotos(retryCount + 1);
    } else {
      throw error;
    }
  }
};

const fetchPhotoSizes = async (photoId) => {
  try {
    const response = await axios.get("https://www.flickr.com/services/rest/", {
      params: {
        method: "flickr.photos.getSizes",
        api_key: apiKey,
        photo_id: photoId,
        format: "json",
        nojsoncallback: 1,
      },
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
      },
    });
    return response.data.sizes.size;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des tailles de la photo:",
      error.message
    );
    throw error;
  }
};

const extractDossards = (tagsString) => {
  if (!tagsString) return [];

  const tags = tagsString.split(" ");
  const dossards = [];

  tags.forEach((tag) => {
    const match = tag.match(/(?:dossard|bib)?(\d+)/i);
    if (match && match[1]) {
      dossards.push(match[1]);
    }
  });

  return [...new Set(dossards)];
};

export default async function handler(req, res) {
  try {
    if (!albumId) {
      return res.status(500).json({
        error:
          "FLICKR_TRIATHLON_ALBUM_ID non configuré dans les variables d'environnement",
      });
    }

    const photos = await fetchPhotos();
    res.status(200).json(photos);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des photos Flickr:",
      error.message
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des photos",
      details: error.message,
    });
  }
}
