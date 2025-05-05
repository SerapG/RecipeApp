import axios from "axios";
const API_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/categories.php`);
        return response.data.categories;
    } catch (error) {
        console.error("Kategoriler cekilemedi. Hata:", error);
        return [];
    }

};

export const fetchMealsByCategory = async (category: string) => {
    try {
        const response = await axios.get(`${API_URL}/filter.php?c=${category}`);
        return response.data.meals;
    } catch (error) {
        console.error(`${category} kategorisi icin yemekler alinamadi`, error);
        return [];
    }
};
export default API_URL;