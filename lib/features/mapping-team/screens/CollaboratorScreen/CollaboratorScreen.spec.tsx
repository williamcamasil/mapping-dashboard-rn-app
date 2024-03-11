import React from 'react';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import CollaboratorScreen from '.';
import NavigatorParamList from '../../navigation/types';

const mockCollaborator = {
  Id: 1,
  Name: 'Adriano Mendes',
  Office: 'Gestor',
  Project: 'Omni Bulls',
  Squad: 'Arquitetura',
  Company: 'DB1',
  Hired: 2018,
  Skills: 'Gerir projetos e pessoas',
  Email: 'adriano.mendes@db1.com.br',
  Location: 'Paraná (Maringá)',
  Responsibilities: 'Gestão de pessoas e projeto',
};

const renderScreen = async (
  route: RouteProp<NavigatorParamList, 'CollaboratorScreen'> = {
    key: '',
    name: 'CollaboratorScreen',
    params: {
      itemSelected: mockCollaborator,
    },
  },
) => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <CollaboratorScreen
              route={route}
            />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(CollaboratorScreen));

  return result;
};

describe('CollaboratorScreen', () => {
  it('Should render screen with ...', async () => {
    const screen = await renderScreen();
    screen.getByText('Adriano Mendes');
  });

  it('should user press navigation back icon', async () => {
    const navigation = createNavigationMock();
    const screen = await renderScreen();
    const navigationIconBack = screen.getByTestId('go-back-action');
    fireEvent.press(navigationIconBack);
    expect(navigation.goBack).toBeCalled();
    screen.unmount();
  });
});
