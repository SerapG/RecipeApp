import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Tabs: undefined;
    Details: { id: string };
};

const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Detaya Git"
                onPress={() => navigation.navigate('Details', { id: '1234' })}
            />
        </View>
    )
}

export default HomeScreen