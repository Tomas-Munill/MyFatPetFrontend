import axios from 'axios';
import { getToken } from './tokenService';

const baseUrl = 'http://localhost:3003/api/pets';

const getTodaysPetsMeals = async () => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const response = await axios.get(`${baseUrl}/todays-meals`, config);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar mascotas: ', error);
    throw error;
  }
};

export default { getTodaysPetsMeals };
