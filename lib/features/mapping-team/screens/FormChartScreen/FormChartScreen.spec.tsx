import React from 'react';

import { NavigationContainer, RouteProp, StackActions } from '@react-navigation/native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { AppProvider, createNavigationMock } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import FormChartScreen from '.';
import { FormType, TeamStructureEnum } from '../../api/TeamService';
import NavigatorParamList from '../../navigation/types';

const defaultMockMemberData = {
  Id: 1,
  Main: false,
  Structure: TeamStructureEnum.EQUIPE,
  Name: '',
  Type: '',
};

const mockFormType = 'create';

const renderScreen = async (
  editedItem = defaultMockMemberData,
  formType = mockFormType as FormType,
  route: RouteProp<NavigatorParamList, 'FormChartScreen'> = {
    key: '',
    name: 'FormChartScreen',
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
            <FormChartScreen
              route={route}
            />
          </ModalProvider>
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>,
  );

  await waitFor(() => result.UNSAFE_getByType(FormChartScreen));

  return result;
};

describe('FormChartScreen', () => {
  it('Should render screen inputs and button "Salvar" disabled', async () => {
    const screen = await renderScreen(defaultMockMemberData, 'edit');
    await waitFor(() => expect(screen.getByText('Salvar')).toBeDisabled());
    screen.getByText('Editar');
    screen.getByText('Squad');
    screen.getByTestId('input-name-manager');
    screen.getByTestId('input-description');
  });

  it('Should render screen with title "Criar"', async () => {
    const screen = await renderScreen();
    screen.getByText('Criar');
  });

  it('Should fill inputs, click on button "Salvar" and navigate to ChartScreen', async () => {
    const navigationHolder = createNavigationMock();
    const screen = await renderScreen();
    screen.getByText('Criar');
    const buttonSave = screen.getByText('Salvar');
    expect(buttonSave).toBeDisabled();
    fireEvent.press((await screen.findAllByTestId('input-select-button'))[0]);
    fireEvent.press(await screen.findByText('Arquitetura'));
    fireEvent.changeText(await screen.findByTestId('input-name-manager'), 'Teste Mapping');
    fireEvent.changeText(await screen.findByTestId('input-description'), 'Teste Mapping Description');
    expect(buttonSave).toBeEnabled();
    fireEvent.press(buttonSave);
    await waitFor(() => { expect(navigationHolder.dispatch).toBeCalledWith(StackActions.replace('ChartScreen')); });
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
