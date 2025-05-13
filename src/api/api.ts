import axios from "axios";
const API_URL = "https://www.themealdb.com/api/json/v1/1";

//Kategorileri cekmek cekmek icin fonksiyon
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories.php`);
        return response.data.categories;
    } catch (error) {
        console.error("Kategoriler cekilemedi. Hata:", error);
        return [];
    }

};

//Kategoriye gore yemekleri cekmek icin fonksiyon
export const fetchMealsByCategory = async (category: string) => {
    try {
        const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
        return response.data.meals;
    } catch (error) {
        console.error(`${category} kategorisi icin yemekler alinamadi`, error);
        return [];
    }
};

//Belirli bir yemegin detaylarini id ile cekmek
export const fetchDetailsById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/lookup.php?i=${id}`);
        return response.data.meals[0]; //cunku tek bir obje donuyor
    } catch (error) {
        console.error(`ID:${id} icin yemek detalari alinamadi`, error);
        return null;
    }
};

//Yemegi isme göre ara
export const fetchMealByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URL}/search.php?s=${name}`);
        return response.data.meals || []; //eger yemek bulamazsa null doner
    } catch (error) {
        console.error(`${name} icin arama basarisiz`, error);
        return [];
    }
};

export const searchMealsByName = async (name: string) => {
    try {
        const response = await axios.get(`${API_URL}/search.php?s=${name}`);
        return response.data.meals || []; // null gelirse bos array doner
    } catch (error) {
        console.error("Yemek araması başarısız:", error);
        return [];
    }
};
export const fetchMealsByCountry = async (country: string) => {
    try {
        const response = await axios.get(`${API_URL}/filter.php?a=${country}`);
        return response.data.meals || [];
    } catch (error) {
        console.error("Ülkeye göre yemek getirme hatası:", error);
        return [];
    }
};


export const fetchAreas = async () => {
    try {
        const response = await axios.get(`${API_URL}/list.php?a=list`);
        return response.data.meals || [];
    } catch (error) {
        console.error("Ülkeler çekilemedi:", error);
        return [];
    }
};

export const fetchMealsByFirstLetter = async (letter: string) => {
    try {
        const response = await axios.get(`${API_URL}/search.php?f=${letter}`);
        return response.data.meals || [];
    } catch (error) {
        console.error("Harf ile yemek getirme hatası:", error);
        return [];
    }
};
export default API_URL;