import axios from 'axios';

const api = axios.create({
   baseURL: 'https://foursome4-api.herokuapp.com'
    //baseURL: 'https://api-foursome.herokuapp.com/'
});

export default api;



