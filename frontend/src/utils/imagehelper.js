// frontend/src/utils/imageHelper.js

/**
 * Returns the correct image URL
 * @param {string} imagePath - Filename or path of the image
 * @param {boolean} isFromBackend - true if the image is from backend upload
 * @returns {string} URL for img src
 */
export const getImageURL = (imagePath, isFromBackend = false) => {
  if (!imagePath) return "/placeholder.jpg"; // fallback image

  if (isFromBackend) {
    // Use Vite environment variable
    const backendURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
    return `${backendURL}/uploads/${imagePath}`;
  } else {
    // Static frontend images in public/images
    return `/images/${imagePath}`;
  }
};
