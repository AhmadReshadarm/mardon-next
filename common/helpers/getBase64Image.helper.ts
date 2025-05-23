import axios from 'axios';

export const getBase64Image = async (
  imageUrl: string,
): Promise<string | null> => {
  if (!imageUrl) return null;
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });
    const buffer = Buffer.from(response.data, 'binary');
    const base64Image = buffer.toString('base64');
    const mimeType = imageUrl.includes('.png')
      ? 'image/png'
      : imageUrl.includes('.webp')
      ? 'image/webp'
      : 'image/jpeg';
    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error('Error fetching or converting image to base64:', error);
    return null;
  }
};
