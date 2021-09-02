import axios from 'axios';

// Base única da api = https://sujeitoprogramador.com/  

// Trás os filmes da api = r-api/?api=filmes/

// Trás filmes especificos = r-api/?api=filmes/id

const api = axios.create({
    baseURL: 'https://sujeitoprogramador.com/'
})

export default api;