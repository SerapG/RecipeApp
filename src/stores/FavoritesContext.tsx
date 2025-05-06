import { createContext, useContext, useState, ReactNode } from "react";

export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
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

    const addFavorite = (meal: Meal) => {
        setFavorites((prev) => {
            const exists = prev.find((m) => m.idMeal === meal.idMeal);
            if (exists) return prev;
            return [...prev, meal];
        })
    };

    const removeFavorite = (id: string) => {
        setFavorites((prev) => prev.filter((meal) => meal.idMeal !== id));

    };

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