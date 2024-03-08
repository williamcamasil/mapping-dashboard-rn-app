import React from 'react';

import { NavigationContainer, RouteProp, StackActions } from '@react-navigation/native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import FormSquadScreen from '.';
import { FormType } from '../../api/TeamService';
import NavigatorParamList from '../../navigation/types';

const defaultMockMemberData = {
  Id: 1,
  Name: '',
  Office: '',
  Project: '',
  Squad: '',
  Company: '',
  Hired: 0,
  Skills: '',
  Email: '',
  Location: '',
  Responsibilities: '',
};

const mockFormType = 'create';

const renderScreen = async (
  editedItem = defaultMockMemberData,
  formType = mockFormType as FormType,
  route: RouteProp<NavigatorParamList, 'FormSquadScreen'> = {
    key: '',
    name: 'FormSquadScreen',
    params: {
      editedItem,
      formType,
    },
  },
) => {
  const result = render(
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <ModalProvider throttleTimeout={0}>
            <FormSquadScreen
              route={route}
            />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(FormSquadScreen));

  return result;
};

describe('FormSquadScreen', () => {
  it('Should render screen inputs and button "Salvar" disabled', async () => {
    const screen = await renderScreen(defaultMockMemberData, 'edit');
    await waitFor(() => expect(screen.getByText('Salvar')).toBeDisabled());
    screen.getByText('Editar');
    screen.getByTestId('input-name');
    screen.getByText('Cargo');
    screen.getByTestId('input-project');
    screen.getByTestId('input-company');
    screen.getByTestId('input-skills');
    screen.getByTestId('input-email');
    screen.getByTestId('input-location');
    screen.getByTestId('input-responsibilities');
  });

  it('Should render screen with title "Criar"', async () => {
    const screen = await renderScreen();
    screen.getByText('Criar');
  });

  it('Should fill inputs, click on button "Salvar" and navigate to OverviewScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    screen.getByText('Criar');
    const buttonSave = screen.getByText('Salvar');
    expect(buttonSave).toBeDisabled();
    fireEvent.changeText(await screen.findByTestId('input-name'), 'Teste Nome');
    fireEvent.press((await screen.findAllByTestId('input-select-button'))[0]);
    fireEvent.press(await screen.findByText('Desenvolvedor Front End'));
    fireEvent.changeText(await screen.findByTestId('input-project'), 'Teste Projeto');
    fireEvent.press((await screen.findAllByTestId('input-select-button'))[1]);
    fireEvent.press(await screen.findByText('Arquitetura'));
    fireEvent.changeText(await screen.findByTestId('input-company'), 'Teste Empresa');
    fireEvent.changeText(await screen.findByTestId('input-skills'), 'Teste Habilidades');
    fireEvent.changeText(await screen.findByTestId('input-email'), 'Teste Email');
    fireEvent.changeText(await screen.findByTestId('input-location'), 'Teste Localização');
    fireEvent.changeText(await screen.findByTestId('input-responsibilities'), 'Teste Responsabilidades');
    expect(buttonSave).toBeEnabled();
    fireEvent.press(buttonSave);
    await waitFor(() => { expect(navigationHolder.dispatch).toBeCalledWith(StackActions.replace('OverviewScreen')); });
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
