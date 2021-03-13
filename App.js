/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react';
import Detail from './src/pages/Detail';
import Home from './src/pages/Home';
import { Button } from 'react-native';
import Add from './src/pages/Add';


const Stack = createStackNavigator()

const App = ({ navigation }) => {
  const optionHeader = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} options={{
          title: 'Note Tes', ...optionHeader
        }}
        />
        <Stack.Screen name="Detail" component={Detail} options={{ title: " ", ...optionHeader }} />
        <Stack.Screen name="Add" component={Add} options={{ title: 'Tambah Note', ...optionHeader }} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}



export default App;

