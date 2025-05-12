import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { useFavorites } from '../stores/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';

const FavoriteScreen = () => {

    const { favorites, removeFavorite } = useFavorites();


    if (favorites.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#666' }}>
                    Henüz favorilere eklenen tarif yok 💔
                </Text>
            </View>
        );
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.strMealThumb }} style={styles.image} />

                <View style={styles.info}>
                    <Text style={styles.name}>{item.strMeal}</Text>
                    {item.strArea && (
                        <Text style={styles.area}>{item.strArea}</Text>
                    )}
                </View>

                <TouchableOpacity
                    onPress={() => removeFavorite(item.idMeal)}
                    style={styles.removeButton}
                >
                    <Ionicons name="heart-dislike" size={24} color="#cc0000" />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.emptyText}>Henüz favori yemeğin yok 💔</Text>
            ) : (
                <FlatList
                    data={[...favorites].reverse()}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.idMeal}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
    )
}

export default FavoriteScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#fff',
    },
    emptyText: {
        marginTop: 40,
        fontSize: 18,
        textAlign: 'center',
        color: '#666',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fdfdfd',
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        padding: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    area: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    removeButton: {
        padding: 8,
    },
});