import React, { useRef } from 'react';
import { Animated, View, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SearchScreen from '../screens/SearchScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    const animation = useRef(new Animated.Value(0)).current;

    const triggerHeartAnimation = () => {
        animation.setValue(0); // reset
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };
    const opacity = animation.interpolate({
        inputRange: [0, 0.2, 1],
        outputRange: [0, 1, 0],
    });

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -80],
    });

    const scale = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.5, 1.2, 1],
    });
    return (
        <>
            <Animated.View
                style={[
                    styles.heartContainer,
                    {
                        opacity,
                        transform: [{ translateY }, { scale }],
                    },
                ]}
            >
                <Image
                    source={require('../assets/heart.png')}
                    style={{ width: 50, height: 50 }}
                />
            </Animated.View>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = 'home-outline';
                        if (route.name === 'Favorites') iconName = 'heart-outline';
                        if (route.name === 'Search') iconName = 'search-outline';
                        return <Ionicons name={'heart'} size={24} color={color} />;
                    },
                    headerShown: false,
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    listeners={{
                        tabPress: () => {
                            triggerHeartAnimation();
                        },
                    }}
                />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        </>
    );
};

export default TabNavigator;

const styles = StyleSheet.create({
    heartContainer: {
        position: 'absolute',
        bottom: 40,
        left: '49%',
        marginLeft: -20,
        zIndex: 10,
    },
});