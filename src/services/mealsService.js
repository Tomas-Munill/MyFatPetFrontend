import axios from 'axios';
import { getToken } from './tokenService';

const baseUrl = 'http://localhost:3003/api/meals';

const create = async (meal) => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const response = await axios.post(baseUrl, meal, config);
    return response.data;
  } catch (error) {
    console.error('Error al registrar comida: ', error);
    throw error;
  }
};

export default { create };