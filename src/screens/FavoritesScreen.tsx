import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React from 'react';
import { useFavorites } from '../stores/FavoritesContext';

const FavoriteScreen = () => {

    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Henüz favorilere eklenen tarif yok</Text>

            </View>
        )
    }
    return (
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
                <View>
                    <Image source={{ uri: item.strMealThumb }} style={styles.image} />
                    <Text style={styles.title}>{item.strMeal}</Text>
                </View>
            )}
        />
    )
}

export default FavoriteScreen;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        flexDirection: 'row',
        marginRight: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
