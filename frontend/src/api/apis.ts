import axios from 'axios';

async function getCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getCountryByName(name: string) {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { getCountries, getCountryByName };
