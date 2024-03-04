import React from 'react';

import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import OverviewScreen from '../screens/OverviewScreen';
import ChartScreen from '../screens/ChartScreen';
import CollaboratorScreen from '../screens/CollaboratorScreen';
import SquadScreen from '../screens/SquadScreen';
import FormOverviewScreen from '../screens/FormOverviewScreen';
import FormChartScreen from '../screens/FormChartScreen';
import FormSquadScreen from '../screens/FormSquadScreen';

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
      <Stack.Screen name="FormOverviewScreen" component={FormOverviewScreen} />
      <Stack.Screen name="FormChartScreen" component={FormChartScreen} />
      <Stack.Screen name="FormSquadScreen" component={FormSquadScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
