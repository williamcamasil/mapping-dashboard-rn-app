import React from 'react';

import {
  render, waitFor, fireEvent, waitForElementToBeRemoved,
} from '@testing-library/react-native';
import { ModalProvider } from 'mapping-style-guide-rn';

import TeamMembersItem from '.';
import { MemberPropsType, TeamStructureEnum } from '../../api/TeamService/utils';

const defaultItemDataMock = {
  Id: 1,
  Main: true,
  Structure: TeamStructureEnum.EQUIPE,
  Name: 'Edi Matias',
  Type: 'CO do projeto',
  Collaborator: {
    Id: 1,
    Name: 'Edi Matias',
    Office: 'CO do projeto',
    Project: 'Omni Bulls',
    Squad: '',
    Company: 'Omni',
    Hired: 1997,
    Skills: 'Gerir times',
    Email: 'edi.matias@omni.com.br',
    Location: 'São Paulo (Capital)',
    Responsibilities: 'Gestão de projetos',
  },
};

const itemDataMockNoStar = {
  ...defaultItemDataMock,
  Main: false,
  Structure: TeamStructureEnum.ORGANOGRAMA,
  Name: 'Matias Federico',
};

const renderComponent = async (
  itemData: MemberPropsType = defaultItemDataMock,
  onItemPress: () => void = jest.fn(),
  onItemDeleted: () => void = jest.fn(),
  isAdminUser: boolean = true,
) => {
  const component = render(
    <ModalProvider>
      <TeamMembersItem
        itemData={itemData}
        onItemPress={onItemPress}
        onItemDeleted={onItemDeleted}
        isAdminUser={isAdminUser}
      />
    </ModalProvider>,
  );
  await waitFor(() => component.UNSAFE_getByType(TeamMembersItem));
  return component;
};

describe('TeamMembersItem', () => {
  it('Should match snapshot', async () => {
    const component = await renderComponent();
    expect(component).toMatchSnapshot();
  });

  it('Should render the component with admin prop as star item', async () => {
    const component = await renderComponent();
    component.getByText('Edi Matias');
    component.getByTestId('icon-dots');
    component.getByTestId('icon-star');
  });

  it('Should click on item press', async () => {
    const onItemPress = jest.fn();
    const component = await renderComponent(defaultItemDataMock, onItemPress);
    component.getByText('Edi Matias');
    fireEvent.press(component.getByTestId('item-list'));
    expect(onItemPress).toBeCalled();
  });

  it('Should render the component item as not star item', async () => {
    const component = await renderComponent(itemDataMockNoStar);
    component.getByText('Matias Federico');
    component.queryByTestId('icon-star');
  });

  it('Should render the component without admin prop', async () => {
    const component = await renderComponent(defaultItemDataMock, jest.fn(), jest.fn(), false);
    component.getByText('Edi Matias');
    component.queryByTestId('icon-dots');
  });

  it('Should click on icon dots, show bottom sheet with options', async () => {
    const component = await renderComponent();
    component.getByText('Edi Matias');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('team-members-bottom-sheet');
    component.getByText('Editar item da lista');
    component.getByText('Editar informações da pessoa');
    component.getByText('Excluir item da lista');
  });

  it('Should click on icon dots, show bottom sheet with options without edit personal information option', async () => {
    const component = await renderComponent(itemDataMockNoStar);
    component.getByText('Matias Federico');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('team-members-bottom-sheet');
    component.getByText('Editar item da lista');
    component.queryByTestId('Editar informações da pessoa');
    component.getByText('Excluir item da lista');
  });

  it('Should click on icon dots, show bottom sheet with options, click on delete item and close modal', async () => {
    const component = await renderComponent(itemDataMockNoStar);
    component.getByText('Matias Federico');
    fireEvent.press(component.getByTestId('icon-dots'));
    await component.findByTestId('team-members-bottom-sheet');
    fireEvent.press(component.getByText('Excluir item da lista'));
    await component.findByText('Item excluído com sucesso!');
    fireEvent.press(component.getByText('Ok'));
    await waitForElementToBeRemoved(() => component.queryByText('Item excluído com sucesso!'));
  });
});
