import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home';
import Countries from './countries';
import CountryInfo from './countryinfo';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: "Global Statistics", headerTitleAlign: 'center'}} />
          
          <Stack.Screen name="Countries" component={Countries} options={{ title: "Countries", headerTitleAlign: 'center'}} />

          <Stack.Screen name="CountryInfo" component={CountryInfo} options={{ title: "Country Info", headerTitleAlign: 'center'}} />

        </Stack.Navigator>
    </NavigationContainer>
  );
}