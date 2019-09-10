import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendrocketbox.herokuapp.com'
});
export default api;
