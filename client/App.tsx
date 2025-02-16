import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './global.css';
import AuthPage from 'components/AuthPage';
import LoginPage from 'components/LoginPage';
import SignupPage from 'components/SignupPage';
import MainPage from 'components/MainPage';
import LiveBTCPage from 'components/LiveBTCPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="authPage" component={AuthPage} />
        <Stack.Screen name="loginPage" component={LoginPage} />
        <Stack.Screen name="signupPage" component={SignupPage} />
        <Stack.Screen name="mainPage" component={MainPage} />
        <Stack.Screen name="liveBTCPage" component={LiveBTCPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
