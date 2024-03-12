import React from 'react';

import {
  render, waitFor, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { ModalProvider } from 'mapping-style-guide-rn';

import SquadMembersItem from '.';
import { CollaboratorsPropsType } from '../../api/SquadService/utils';

const defaultItemDataMock = {
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

const renderComponent = async (
  itemData: CollaboratorsPropsType = defaultItemDataMock,
  onItemPress: () => void = jest.fn(),
  onItemDeleted: () => void = jest.fn(),
  isAdminUser: boolean = true,
) => {
  const component = render(
    <ModalProvider>
      <SquadMembersItem
        itemData={itemData}
        onItemPress={onItemPress}
        onItemDeleted={onItemDeleted}
        isAdminUser={isAdminUser}
      />
    </ModalProvider>,
  );
  await waitFor(() => component.UNSAFE_getByType(SquadMembersItem));
  return component;
};

describe('SquadMembersItem', () => {
  it('Should match snapshot', async () => {
    const component = await renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('Should render the component with admin', async () => {
    const component = await renderComponent();
    component.getByText('Adriano Mendes');
    component.getByTestId('icon-dots');
  });

  it('Should click on item press', async () => {
    const onItemPress = jest.fn();
    const component = await renderComponent(defaultItemDataMock, onItemPress);
    component.getByText('Adriano Mendes');
    fireEvent.press(component.getByTestId('item-list'));
    expect(onItemPress).toBeCalled();
  });

  it('Should render the component without admin prop', async () => {
    const component = await renderComponent(defaultItemDataMock, jest.fn(), jest.fn(), false);
    component.getByText('Adriano Mendes');
    component.queryByTestId('icon-dots');
  });

  it('Should click on icon dots, show bottom sheet with options', async () => {
    const component = await renderComponent();
    component.getByText('Adriano Mendes');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('squad-members-bottom-sheet');
    component.getByText('Editar item da lista');
    component.getByText('Excluir item da lista');
  });

  it('Should click on icon dots, show bottom sheet with options and click on first option', async () => {
    const component = await renderComponent();
    component.getByText('Adriano Mendes');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('squad-members-bottom-sheet');
    fireEvent.press(component.getByText('Editar item da lista'));
    await waitForElementToBeRemoved(() => component.queryByTestId('squad-members-bottom-sheet'));
  });

  it('Should click on icon dots, show bottom sheet with options, click on delete item and close modal', async () => {
    const component = await renderComponent();
    component.getByText('Adriano Mendes');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('squad-members-bottom-sheet');
    fireEvent.press(component.getByText('Excluir item da lista'));
    await component.findByText('Item excluído com sucesso!');
    fireEvent.press(component.getByText('Ok'));
    await waitForElementToBeRemoved(() => component.queryByText('Item excluído com sucesso!'));
  });
});
