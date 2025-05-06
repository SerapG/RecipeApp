import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Meal, useFavorites } from '../stores/FavoritesContext'

const SampleScreen = () => {

    const { favorites, addFavorite, removeFavorite } = useFavorites();

    const sampleMeal: Meal = {
        idMeal: "1232",
        strMeal: "Chicken Curry",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg"
    }

    return (
        <SafeAreaView>
            <Text>Favori Yemekler{favorites.length}</Text>
            <Button title="Ekle" onPress={() => addFavorite(sampleMeal)} />
            <Button title="Cikar" onPress={() => removeFavorite(sampleMeal.idMeal)} />
        </SafeAreaView>
    )
}

export default SampleScreen;