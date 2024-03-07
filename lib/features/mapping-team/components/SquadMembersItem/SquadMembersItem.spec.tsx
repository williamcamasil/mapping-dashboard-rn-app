import React from 'react';

import {
  render, waitFor,
} from '@testing-library/react-native';
import { ModalProvider } from 'mapping-style-guide-rn';

import SquadMembersItem from '.';

const onCardPressMock = jest.fn();
const onContactDeletedMock = jest.fn();

const renderComponent = async (cardData: any) => {
  const component = render(
    <ModalProvider>
      <SquadMembersItem
        itemData={cardData}
        onItemPress={onCardPressMock}
        onItemDeleted={onContactDeletedMock}
        isAdminUser
      />
    </ModalProvider>,
  );
  await waitFor(() => component.UNSAFE_getByType(SquadMembersItem));
  return component;
};

const favoredDataMock = {};

describe('SquadMembersItem', () => {
  it('Should match snapshot', async () => {
    const component = await renderComponent(favoredDataMock);
    expect(component).toMatchSnapshot();
  });
});
