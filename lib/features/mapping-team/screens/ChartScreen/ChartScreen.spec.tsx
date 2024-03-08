import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  render, fireEvent, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import ChartScreen from '.';

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
            <ChartScreen />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(ChartScreen));

  return result;
};

const mockItemSelected = {
  Id: 1,
  Name: 'Arquitetura',
  Description: 'Manter a arquitetura do projeto funcionando, performando e com qualidade.',
  Manager: 'Yano',
  Collaborators: [
    {
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
    },
    {
      Id: 2,
      Name: 'Eloi Rodrigues',
      Office: 'Líder Técnico',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'Omni',
      Hired: 2013,
      Skills: 'Gerir squad de arquitetura',
      Email: 'eloi.rodrigues@omni.com.br',
      Location: 'São Paulo (Campinas)',
      Responsibilities: 'Manter a arquitetura do projeto com qualidade e em evolução',
    },
    {
      Id: 3,
      Name: 'Lucas Magalhães',
      Office: 'Tech Leader',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'DB1',
      Hired: 2015,
      Skills: 'Apoiar nos desafios técnicos e orientar evolução de carreira e habilidades',
      Email: 'lucas.magalhaes@db1.com.br',
      Location: 'Paraná (Maringá)',
      Responsibilities: 'Apoio técnico',
    },
    {
      Id: 4,
      Name: 'Douglas Silva',
      Office: 'Desenvolvedor FrontEnd',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'DB1',
      Hired: 2008,
      Skills: 'React Native, React Js, Angular, Jest, Java Script, Type Script, ...',
      Email: 'douglas.silva@db1.com.br',
      Location: 'Paraná (Maringá)',
      Responsibilities: 'Manter a arquitetura do projeto, desenvolver novas features e dar manutenção no sistema',
    },
    {
      Id: 5,
      Name: 'Fernanda Sonata',
      Office: 'Desenvolvedor FrontEnd',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'DB1',
      Hired: 2014,
      Skills: 'React Native, React Js, Angular, Jest, Java Script, Type Script, ...',
      Email: 'fernanda.sonata@db1.com.br',
      Location: 'Paraná (Maringá)',
      Responsibilities: 'Manter a arquitetura do projeto, desenvolver novas features e dar manutenção no sistema',
    },
    {
      Id: 6,
      Name: 'William Machado',
      Office: 'Desenvolvedor FrontEnd',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'DB1',
      Hired: 2021,
      Skills: 'React Native, React Js, Angular, Jest, Java Script, Type Script, ...',
      Email: 'william.machado@db1.com.br',
      Location: 'São Paulo (Capital)',
      Responsibilities: 'Manter a arquitetura do projeto, desenvolver novas features e dar manutenção no sistema',
    },
    {
      Id: 7,
      Name: 'Júlia Yto',
      Office: 'Quality Assurance',
      Project: 'Omni Bulls',
      Squad: 'Arquitetura',
      Company: 'DB1',
      Hired: 2017,
      Skills: 'Testes de fluxos e serviços',
      Email: 'julia.yto@db1.com.br',
      Location: 'Santa Catarina (Capital)',
      Responsibilities: 'Manter a arquitetura do projeto, desenvolver testes manter o sistema',
    },
  ],
};

describe('ChartScreen', () => {
  it('Should render screen with list of team', async () => {
    const screen = await renderScreen();
    screen.getByText('Organização da equipe');
    screen.getByText('Organograma dos times: Omni Bulls');
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Arquitetura');
    screen.getByText('Segurança');
    screen.getByText('Regulatório');
    screen.unmount();
  });

  it('Should render admin options if user is admin', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    screen.getByText('Nova squad');
    expect(screen.getAllByTestId('icon-dots')[0]).toBeTruthy();
    screen.unmount();
  });

  it('Should render user with no options of admin', async () => {
    const screen = await renderScreen({ email: 'email', isAdminUser: false });
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    expect(screen.queryByText('Nova squad')).toBeFalsy();
    expect(screen.queryAllByTestId('icon-dots')[0]).toBeFalsy();
    screen.unmount();
  });

  it('Should click on new and navigate to FormChartScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Nova squad'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('FormChartScreen', { formType: 'create' });
    screen.unmount();
  });

  it('Should click on first item and navigate to ChartScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getByText('Arquitetura'));
    expect(navigationHolder.navigate).toHaveBeenCalledWith('SquadScreen', { itemSelected: mockItemSelected });
    screen.unmount();
  });

  it('Should click on bullets, open bottom sheet and click on third option to show deleted item message', async () => {
    const screen = await renderScreen();
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-container'));
    fireEvent.press(screen.getAllByTestId('icon-dots')[0]);
    await screen.findByTestId('leader-members-bottom-sheet');
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
