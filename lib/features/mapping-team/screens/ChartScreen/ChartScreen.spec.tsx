import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
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
  it('Should render screen with component banner carousel', async () => {
    const screen = await renderScreen();
    screen.getByTestId('carousel-flat-list-id');
  });

  it('Should click start button and be redirected to cpf data screen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();

    const button = screen.getByTestId('btn-start');
    fireEvent.press(button);

    expect(navigationHolder.navigate).toHaveBeenCalledWith('CpfScreen');
  });

  it('Should click on the call center button and be redirected to the help center screen', async () => {
    const screen = await renderScreen();

    const button = screen.getByTestId('link-help-center');
    fireEvent.press(button);

    await screen.findByText('Central de relacionamento');
  });
});
