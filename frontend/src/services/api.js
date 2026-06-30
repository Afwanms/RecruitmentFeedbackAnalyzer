import axios from "axios";

const api = axios.create({
    baseURL:  "http://100.54.144.67:8000"
});

export default api;
