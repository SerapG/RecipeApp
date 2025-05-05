import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { fetchCategories } from './src/api/api'

const App = () => {
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      console.log(JSON.stringify(categories, null, 2));
    };

    getCategories();

  }, [])

  return (
    <View>
      <Text>Recipe App</Text>
    </View>
  )
}

export default App