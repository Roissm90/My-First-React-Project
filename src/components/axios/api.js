import axios from "axios";


const APIHeader = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
    'Acces-Control-Allow-Origin': '*',//* acepta todo
    'Authorization': {
        toString() {
            return `Bearer ${localStorage.getItem('token')}`;
        }
    },
};

export const API = axios.create({
    headers: APIHeader,
    timeout: 10000,
    baseURL: 'http://localhost:5001/',
});