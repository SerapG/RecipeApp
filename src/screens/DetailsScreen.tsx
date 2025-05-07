import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { fetchDetailsById } from '../api/api';
import { RootStackParamList } from '../navigator/StackNavigator';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type MealDetail = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    [key: string]: any;
};


const DetailsScreen = () => {
    const route = useRoute<DetailsScreenRouteProp>();
    const { id } = route.params;

    const [meal, setMeal] = useState<MealDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMeal = async () => {
            const data = await fetchDetailsById(id);
            setMeal(data);
            setLoading(false);
        };
        loadMeal();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!meal) {
        return (
            <View style={styles.center}>
                <Text>Meal not found</Text>
            </View>
        );
    }

    const renderIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                ingredients.push(
                    <Text key={i} style={styles.ingredient}>
                        • {ingredient} - {measure}
                    </Text>
                );
            }
        }
        return ingredients;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.subInfo}>
                {meal.strCategory} • {meal.strArea}
            </Text>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {renderIngredients()}

            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
        </ScrollView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subInfo: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 4,
    },
    instructions: {
        fontSize: 16,
        lineHeight: 22,
    },
});
