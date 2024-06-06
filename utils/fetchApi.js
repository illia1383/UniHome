// fetchApi.js
import axios from "axios";

export const baseUrl = 'https://zillow56.p.rapidapi.com';

export const fetchApi = async (url, params) => {
    const { data } = await axios.get(url, { 
        params,
        headers: {
            'x-rapidapi-key': '7ed8026fa5msh410a044ce662700p102473jsn3500d36e364d',
    'x-rapidapi-host': 'zillow56.p.rapidapi.com'
        }
    });
    return data; // Ensure to return the fetched data
};


