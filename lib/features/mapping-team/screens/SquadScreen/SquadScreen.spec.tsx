import React from 'react';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { AppProvider } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import SquadScreen from '.';
import NavigatorParamList from '../../navigation/types';

const mockSelectedItem = {
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

const renderScreen = async (
  route: RouteProp<NavigatorParamList, 'SquadScreen'> = {
    key: '',
    name: 'SquadScreen',
    params: {
      itemSelected: mockSelectedItem,
    },
  },
) => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
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
  it('Should render screen with ...', async () => {
    const screen = await renderScreen();
    screen.getByText('Arquitetura');
    screen.unmount();
  });
});
