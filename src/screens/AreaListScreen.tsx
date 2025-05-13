import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Image,
} from 'react-native';
import { fetchAreas, fetchMealsByCountry } from '../api/api';
import { useNavigation } from '@react-navigation/native';


export type Meal = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};
const AreaListScreen = () => {
    const [areas, setAreas] = useState<string[]>([]);
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<any>();

    useEffect(() => {
        const loadAreasAndMeals = async () => {
            const data = await fetchAreas();
            const areaNames = data.map((item: any) => item.strArea);
            setAreas(areaNames);
            setSelectedArea(areaNames[0]);

            const mealsData = await fetchMealsByCountry(areaNames[0]);
            setMeals(mealsData);
            setLoading(false);
        };

        loadAreasAndMeals();
    }, []);

    useEffect(() => {
        const loadMeals = async () => {
            if (!selectedArea) return;
            setLoading(true);
            const data = await fetchMealsByCountry(selectedArea);
            setMeals(data);
            setLoading(false);

        };

        loadMeals();

    }, [selectedArea]);



    const renderMeal = ({ item }: any) => (
        <TouchableOpacity
            style={styles.mealCard}
            onPress={() => navigation.navigate('Details', { id: item.idMeal })}
        >
            <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            <Text style={styles.mealTitle}>{item.strMeal}</Text>
        </TouchableOpacity>
    );

    const renderAreaButtons = () => (
        <View style={styles.areaContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {areas.map((area) => (
                    <TouchableOpacity
                        key={area}
                        onPress={() => setSelectedArea(area)}
                        style={[
                            styles.areaButton,
                            selectedArea === area && styles.selectedAreaButton,
                        ]}
                    >
                        <Text
                            style={[
                                styles.areaText,
                                selectedArea === area && styles.selectedAreaText,
                            ]}
                        >
                            {area}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={styles.container}>
            {renderAreaButtons()}
            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : meals.length > 0 ? (
                <FlatList<Meal>
                    data={meals.filter((meal) => meal && meal.idMeal)}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={renderMeal}
                    contentContainerStyle={styles.mealList}
                />
            ) : (
                <View style={styles.center}>
                    <Text>Bu ülkeye ait yemek bulunamadı.</Text>
                </View>
            )}
        </View>
    );
};

export default AreaListScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    areaContainer: {
        marginTop: 16,
        height: 60,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    areaButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 8,
    },
    selectedAreaButton: {
        backgroundColor: '#007AFF',
    },
    areaText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    selectedAreaText: {
        color: '#fff',
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
