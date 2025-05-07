import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCategories } from '../api/api';

type Category = {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
};


const HomeScreen = () => {

    const navigation = useNavigation<any>();
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        loadCategories();
    }, []);

    const renderCategory = ({ item }: { item: Category }) => {
        return (
            <TouchableOpacity
                style={styles.card}
                onPress={() =>
                    navigation.navigate('MealsByCategory', { category: item.strCategory })
                }
            >
                <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
                <Text style={styles.title}>{item.strCategory}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Meal Categories</Text>
            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.idCategory}
                numColumns={2}
            />
        </View>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 20,
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
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
});