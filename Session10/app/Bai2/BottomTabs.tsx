import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function BottomTabs() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Trang chủ' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingScreen} 
          options={{ title: 'Cài đặt' }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Hồ sơ' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


