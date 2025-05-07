import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import DetailScreen from '../screens/DetailsScreen';
import MealsByCategoryScreen from '../screens/MealsByCategoryScreen';


export type RootStackParamList = {
    Tabs: undefined;
    MealsByCategory: { category: string };
    Details: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();



const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={DetailScreen} options={{ headerShown: true }} />
            <Stack.Screen
                name="MealsByCategory"
                component={MealsByCategoryScreen}
                options={{ title: 'Meals' }}
            />
        </Stack.Navigator>
    );
};

export default StackNavigator;