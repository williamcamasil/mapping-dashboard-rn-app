import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import DashboardScreen from '../screens/DashboardScreen';

import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'DashboardScreen'}>
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
