import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import { FavoritesProvider } from './src/stores/FavoritesContext';


const App = () => {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  )
}

export default App;