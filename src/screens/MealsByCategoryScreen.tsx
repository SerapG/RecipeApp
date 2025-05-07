import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { fetchMealsByCategory } from '../api/api';

type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

type RouteParams = {
    category: string;
};

const MealsByCategoryScreen = () => {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const { category } = route.params;
    const navigation = useNavigation<any>();

    const [meals, setMeals] = useState<Meal[]>([]);

    useEffect(() => {
        const loadMeals = async () => {
            const data = await fetchMealsByCategory(category);
            setMeals(data);
        };
        loadMeals();
    }, [category]);

    const renderMeal = ({ item }: { item: Meal }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id: item.idMeal })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{category} Meals</Text>
            <FlatList
                data={meals}
                renderItem={renderMeal}
                keyExtractor={(item) => item.idMeal}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default MealsByCategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        gap: 12,
    },
    card: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: 12,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
    },
});
