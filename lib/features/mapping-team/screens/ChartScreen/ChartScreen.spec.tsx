import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { AppProvider } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import ChartScreen from '.';

const renderScreen = async () => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <ChartScreen />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(ChartScreen));

  return result;
};

describe('ChartScreen', () => {
  it('Should render screen with ...', async () => {
    const screen = await renderScreen();
    screen.getByText('Squads:');
    screen.unmount();
  });
});
