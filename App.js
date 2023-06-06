import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskLists from './src/pages/TaskLists';
import RegisterScreen from './src/pages/Registro/RegisterScreen';
import LoginScreen from './src/pages/Login/Login';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="TaskLists" component={TaskLists} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
