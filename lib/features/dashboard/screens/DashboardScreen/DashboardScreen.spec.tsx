import React from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { createNavigationMock } from 'mapping-context-rn';

import DashboardScreen from '.';

const renderScreen = async () => {
  const result = render(
    <NavigationContainer>
      <DashboardScreen />
    </NavigationContainer>,
  );

  await waitFor(() => result.UNSAFE_getByType(DashboardScreen));

  return result;
};

describe('DashboardScreen', () => {
  it('Should render screen and navigate to MappingTeamNavigation', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    screen.getByText('Dashboard');
    fireEvent.press(screen.getByText('Equipe'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('MappingTeamNavigation');
  });

  it('Should click on logout and navigate to login', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    screen.getByText('Dashboard');
    fireEvent.press(screen.getByText('Logout'));
    await waitFor(() => { expect(navigationHolder.dispatch).toBeCalledWith(StackActions.replace('LOGIN')); });
  });
});
