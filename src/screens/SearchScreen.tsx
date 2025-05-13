import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';

import { searchMealsByName } from '../api/api';
import { useNavigation } from '@react-navigation/native';
const SearchScreen = () => {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigation = useNavigation<any>();


    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(() => {
            searchMealsByName(query).then(setResults);
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);


    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { id: item.idMeal })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.name}>{item.strMeal}</Text>
                <Text style={styles.area}>{item.strArea}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Bir yemek ara..."
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />

            {results.length === 0 && query.trim() !== '' ? (
                <Text style={styles.empty}>Sonuç bulunamadı</Text>
            ) : (
                <FlatList<any>
                    data={results}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={renderItem}
                />
            )}
        </SafeAreaView>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 30 : 0,

    },
    input: {
        marginTop: 50,
        padding: 12,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
    },
    image: { width: 80, height: 80 },
    info: { flex: 1, paddingHorizontal: 10 },
    name: { fontSize: 16, fontWeight: 'bold' },
    area: { fontSize: 14, color: '#666' },
    empty: { textAlign: 'center', color: '#666', marginTop: 20 },
});