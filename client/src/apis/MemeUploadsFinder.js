import axios from 'axios';

// NODE_ENV = 'development'
// NODE_ENV = 'production'

// if we are in production, baseurl = /api/v1/meme_uploads

//const baseURL = 'http://localhost:3001/api/v1/meme_uploads';

const baseURL = process.env.NODE_ENV === "production" ? "/api/v1/meme-uploads" : "http://localhost:3001/api/v1/meme-uploads";

export default axios.create({
    baseURL,
});