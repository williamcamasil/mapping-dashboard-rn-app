import React from 'react';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import SquadScreen from '.';
import NavigatorParamList from '../../navigation/types';

type LoggedUserType = {
  email: string;
  isAdminUser: boolean;
};

const defaultMockItemSelected = {
  Id: 2,
  Name: 'Segurança',
  Description: 'Teste 1 Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.',
  Manager: 'Teste 2',
  Collaborators: [
    {
      Id: 1,
      Name: 'Teste Silva',
      Office: 'Gestor',
      Project: 'Omni Bulls',
      Squad: 'Segurança',
      Company: 'DB1',
      Hired: 2018,
      Skills: 'Gerir projetos e pessoas',
      Email: 'teste.silva@db1.com.br',
      Location: 'Paraná (Maringá)',
      Responsibilities: 'Gestão de pessoas e projeto',
    },
    {
      Id: 2,
      Name: 'Teste Vieira',
      Office: 'Líder Técnico',
      Project: 'Omni Bulls',
      Squad: 'Segurança',
      Company: 'Omni',
      Hired: 2013,
      Skills: 'Gerir squad',
      Email: 'teste.vieira@omni.com.br',
      Location: 'São Paulo (Campinas)',
      Responsibilities: 'Manter o projeto com qualidade e em evolução',
    },
    {
      Id: 3,
      Name: 'Teste Santos',
      Office: 'Tech Leader',
      Project: 'Omni Bulls',
      Squad: 'Segurança',
      Company: 'DB1',
      Hired: 2015,
      Skills: 'React Native, React Js, Angular, Jest, Java Script, Type Script, ...',
      Email: 'teste.santos@db1.com.br',
      Location: 'Paraná (Maringá)',
      Responsibilities: 'Manter o projeto, desenvolver novas features e dar manutenção no sistema',
    },
  ],
};

const renderScreen = async (
  loggedUser: LoggedUserType = { email: 'email', isAdminUser: true },
  route: RouteProp<NavigatorParamList, 'SquadScreen'> = {
    key: '',
    name: 'SquadScreen',
    params: {
      itemSelected: defaultMockItemSelected,
    },
  },
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
            <SquadScreen
              route={route}
            />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(SquadScreen));

  return result;
};

describe('SquadScreen', () => {
  it('Should render screen with list of team', async () => {
    const screen = await renderScreen();
    screen.getByText('Segurança');
    screen.getByText('Teste 1 Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI.');
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Teste Silva');
    screen.getByText('Teste Vieira');
    screen.getByText('Teste Santos');
    screen.unmount();
  });

  it('Should render admin options if user is admin', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Novo colaborador');
    expect(screen.getAllByTestId('icon-dots')[0]).toBeTruthy();
    screen.unmount();
  });

  it('Should render user with no options of admin', async () => {
    const screen = await renderScreen({ email: 'email', isAdminUser: false });
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    expect(screen.queryByText('Novo colaborador')).toBeFalsy();
    expect(screen.queryAllByTestId('icon-dots')[0]).toBeFalsy();
    screen.unmount();
  });

  it('Should click on new and navigate to FormSquadScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Novo colaborador'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('FormSquadScreen', { formType: 'create' });
    screen.unmount();
  });

  it('Should click on first item and navigate to ChartScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Teste Silva'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('CollaboratorScreen', { itemSelected: defaultMockItemSelected.Collaborators[0] });
    screen.unmount();
  });

  it('Should click on bullets, open bottom sheet and click on third option to show deleted item message', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getAllByTestId('icon-dots')[0]);
    await screen.findByTestId('squad-members-bottom-sheet');
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
