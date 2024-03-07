import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import OverviewScreen from '.';

type LoggedUserType = {
  email: string;
  isAdminUser: boolean;
};

const renderScreen = async (
  loggedUser: LoggedUserType = { email: 'email', isAdminUser: true },
) => {
  const result = render(
    <ThemeProvider>
      <AppProvider initialState={{
        loggedUser,
        roles: [],
      }}
      >
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <OverviewScreen />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(OverviewScreen));

  return result;
};

const mockSquadData = {
  Collaborator: {
    Company: 'Omni',
    Email: 'edi.matias@omni.com.br',
    Hired: 1997,
    Id: 1,
    Location: 'São Paulo (Capital)',
    Name: 'Edi Matias',
    Office: 'CO do projeto',
    Project: 'Omni Bulls',
    Responsibilities: 'Gestão de projetos',
    Skills: 'Gerir times',
    Squad: '',
  },
  Id: 1,
  Main: true,
  Name: 'Edi Matias',
  Structure: 'EQUIPE',
  Type: 'CO do projeto',
};

const mockCollaboratorData = {
  Company: 'Omni',
  Email: 'edi.matias@omni.com.br',
  Hired: 1997,
  Id: 1,
  Location: 'São Paulo (Capital)',
  Name: 'Edi Matias',
  Office: 'CO do projeto',
  Project: 'Omni Bulls',
  Responsibilities: 'Gestão de projetos',
  Skills: 'Gerir times',
  Squad: '',
};

describe('OverviewScreen', () => {
  it('Should render screen with list of team', async () => {
    const screen = await renderScreen();
    screen.getByText('Estrutura de projeto do time Omni Bulls');
    screen.getByText('Equipe:');
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Edi Matias');
    screen.getByText('Sandra');
    screen.getByText('Organograma das squads');
    screen.unmount();
  });

  it('Should render admin options if user is admin', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Novo');
    expect(screen.getAllByTestId('icon-dots')[0]).toBeTruthy();
    screen.unmount();
  });

  it('Should render user with no options of admin', async () => {
    const screen = await renderScreen({ email: 'email', isAdminUser: false });
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    expect(screen.queryByText('Novo')).toBeFalsy();
    expect(screen.queryAllByTestId('icon-dots')[0]).toBeFalsy();
    screen.unmount();
  });

  it('Should click on new and navigate to FormOverviewScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Novo'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('FormOverviewScreen', { formType: 'create' });
    screen.unmount();
  });

  it('Should click on first item and navigate to ChartScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Organograma das squads'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('ChartScreen');
    screen.unmount();
  });

  it('Should click on first item and navigate to CollaboratorScreen with params', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Edi Matias'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('CollaboratorScreen', {
      itemSelected: mockCollaboratorData,
    });
    screen.unmount();
  });

  it('Should click on bullets, open bottom sheet and click on first option to navigate to FormOverviewScreen with params', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getAllByTestId('icon-dots')[0]);
    await screen.findByTestId('team-members-bottom-sheet');
    screen.getByText('O que deseja fazer?');
    screen.getByText('Escolha uma opção');
    fireEvent.press(screen.getByText('Editar item da lista'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('FormOverviewScreen', { editedItem: mockSquadData, formType: 'edit' });
    screen.unmount();
  });

  it('Should click on bullets, open bottom sheet and click on second option to navigate to FormSquadScreen with params', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getAllByTestId('icon-dots')[0]);
    await screen.findByTestId('team-members-bottom-sheet');
    screen.getByText('O que deseja fazer?');
    screen.getByText('Escolha uma opção');
    fireEvent.press(screen.getByText('Editar informações da pessoa'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('FormSquadScreen', { editedItem: mockCollaboratorData, formType: 'edit' });
    screen.unmount();
  });

  it('Should click on bullets, open bottom sheet and click on third option to show deleted item message', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getAllByTestId('icon-dots')[0]);
    await screen.findByTestId('team-members-bottom-sheet');
    screen.getByText('O que deseja fazer?');
    screen.getByText('Escolha uma opção');
    fireEvent.press(screen.getByText('Excluir item da lista'));
    await screen.findByText('Item excluído com sucesso!');
    screen.unmount();
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
