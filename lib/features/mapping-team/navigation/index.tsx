import React, { useCallback } from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import OverviewScreen from '../screens/OverviewScreen';
import ChartScreen from '../screens/ChartScreen';
import CollaboratorScreen from '../screens/CollaboratorScreen';
import SquadScreen from '../screens/SquadScreen';

import NavigatorParamList from './types';

const Stack = createStackNavigator<NavigatorParamList>();

const screenOptions: StackNavigationOptions = {
  headerShown: false,
};

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName={'OverviewScreen'}>
      <Stack.Screen name="OverviewScreen" component={OverviewScreen} />
      <Stack.Screen name="ChartScreen" component={ChartScreen} />
      <Stack.Screen name="CollaboratorScreen" component={CollaboratorScreen} />
      <Stack.Screen name="SquadScreen" component={SquadScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
