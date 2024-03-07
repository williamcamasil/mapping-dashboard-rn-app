import React from 'react';

import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { render, waitFor } from '@testing-library/react-native';
import { AppProvider } from 'mapping-context-rn';
import { ModalProvider, ThemeProvider } from 'mapping-style-guide-rn';

import FormSquadScreen from '.';
import { FormType } from '../../api/TeamService';
import NavigatorParamList from '../../navigation/types';

const mockFormType = 'create';

const renderScreen = async (
  formType = mockFormType as FormType,
  route: RouteProp<NavigatorParamList, 'FormSquadScreen'> = {
    key: '',
    name: 'FormSquadScreen',
    params: {
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
  it('Should render screen with title "Editar"', async () => {
    const screen = await renderScreen('edit');
    screen.getByText('Editar');
  });
});
