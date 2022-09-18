import axios from 'axios';

const api = axios.create({
   //baseURL: 'http://localhost:3333/'
   //baseURL: 'https://foursome4-api.herokuapp.com'
    baseURL: 'https://api-foursome.herokuapp.com/'
});

export default api;



