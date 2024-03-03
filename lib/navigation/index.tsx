import React, { useCallback } from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { Navigation as DashboardNavigation } from '../features/dashboard';
import { Navigation as MappingTeamNavigation } from '../features/mapping-team';
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
      <Stack.Screen name="MappingTeamNavigation" component={MappingTeamNavigation} />
    </Stack.Navigator>
  );
};

export default Navigation;
