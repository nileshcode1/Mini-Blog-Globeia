// Get the base URL for images (without /api)
export const getImageBaseUrl = () => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  // Remove '/api' from the end to get the base server URL
  return apiUrl.replace('/api', '');
};

// Get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  const baseUrl = getImageBaseUrl();
  return `${baseUrl}${imagePath}`;
};