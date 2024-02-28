import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Navigation as DashboardNavigation } from '../features/dashboard';
import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={'DashboardNavigation'}
    >
      <Stack.Screen name="DashboardNavigation" component={DashboardNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
