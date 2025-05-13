import { createContext, useContext, useState, ReactNode, useEffect } from "react";

import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strArea?: string;
}

type FavoritesContextType = {
    favorites: Meal[];
    addFavorite: (meal: Meal) => void;
    removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
    undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {

    const [favorites, setFavorites] = useState<Meal[]>([]);

    const saveFavoritesToFireStore = async (favorites: Meal[]) => {
        try {
            await setDoc(doc(db, "favorites", "user1"), { favorites });
            console.log("Firestore'a başarıyla kaydedildi!");
        } catch (error) {
            console.error("Firestore'a yazılamadı:", error);
        }
    };

    const loadFavoritesFromFirestore = async (): Promise<Meal[]> => {
        const docSnap = await getDoc(doc(db, "favorites", "user1"));
        if (docSnap.exists()) {
            return docSnap.data().favorites || [];
        }
        return [];
    };

    const addFavorite = async (meal: Meal) => {
        if (favorites.some(f => f.idMeal === meal.idMeal)) return;
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites);
        console.log("Favori güncellendi, Firestore'a gönderiliyor:", updatedFavorites);
        await saveFavoritesToFireStore(updatedFavorites);
    };

    const removeFavorite = async (id: string) => {
        const updated = favorites.filter((meal) => meal.idMeal !== id);
        setFavorites(updated);
        await saveFavoritesToFireStore(updated);

    };

    useEffect(() => {
        const loadData = async () => {
            const data = await loadFavoritesFromFirestore();
            setFavorites(data);
        };
        loadData();
    }, []);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error(
            "useFavorites hooku'u FavoritesProvider ile kullanilmalidir."
        );
    }
    return (context);
}