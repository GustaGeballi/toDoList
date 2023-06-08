import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskList from './src/pages/TaskLists';
import RegisterScreen from './src/pages/Registro/RegisterScreen';
import LoginScreen from './src/pages/Login/Login';
import { UserProvider } from './src/contexts/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="TaskList" component={TaskList} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
