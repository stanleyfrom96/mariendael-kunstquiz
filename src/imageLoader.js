// src/imageLoader.js
const imagesContext = require.context('@/assets/images', false, /\.(png|jpe?g|gif|svg)$/);

export const imageUrls = imagesContext.keys().map(key => imagesContext(key));
