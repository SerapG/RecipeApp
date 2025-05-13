import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    ActivityIndicator,
    SafeAreaView
} from 'react-native';
import { fetchMealsByFirstLetter } from '../api/api';
import { useNavigation } from '@react-navigation/native';

const AlphabeticListScreen = () => {
    const [selectedLetter, setSelectedLetter] = useState('A');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    useEffect(() => {
        const loadMeals = async () => {
            setLoading(true);
            const data = await fetchMealsByFirstLetter(selectedLetter.toLowerCase());
            setMeals(data);
            setLoading(false);
        };
        loadMeals();
    }, [selectedLetter]);

    const renderMeal = ({ item }: any) => (
        <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('Details', { id: item.idMeal })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={styles.mealTitle}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    const renderLetterButtons = () => (
        <View style={styles.letterContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {letters.map((letter) => (
                    <TouchableOpacity
                        key={letter}
                        style={[
                            styles.letterButton,
                            selectedLetter === letter && styles.selectedLetterButton,
                        ]}
                        onPress={() => setSelectedLetter(letter)}
                    >
                        <Text
                            style={[
                                styles.letterText,
                                selectedLetter === letter && styles.selectedLetterText,
                            ]}
                        >
                            {letter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            {renderLetterButtons()}
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : meals.length > 0 ? (
                <FlatList<any>
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={renderMeal}
                    contentContainerStyle={styles.mealList}
                />
            ) : (
                <View style={styles.center}>
                    <Text>Bu harfle başlayan yemek bulunamadı.</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default AlphabeticListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    letterContainer: {
        marginTop: 16,
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    letterList: {
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    letterButton: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        backgroundColor: '#eee',
        borderRadius: 15,
        marginRight: 8,
    },
    selectedLetterButton: {
        backgroundColor: '#007AFF',
    },
    letterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    selectedLetterText: {
        color: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealList: {
        padding: 16,
    },
    mealCard: {
        marginBottom: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    mealImage: {
        width: '100%',
        height: 180,
    },
    mealTitle: {
        padding: 12,
        fontSize: 16,
        fontWeight: '600',
    },
});
