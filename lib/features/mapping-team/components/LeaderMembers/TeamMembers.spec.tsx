import React from 'react';

import {
  render, waitFor, fireEvent,
} from '@testing-library/react-native';
import { ModalProvider } from 'mapping-style-guide-rn';

import TeamMembers from '.';
// import { FavoredApiService, FavoredType } from '../../api/FavoredApiService';
// import { PixKeyType } from '../../api/KeysApiService';

const onCardPressMock = jest.fn();
const onContactDeletedMock = jest.fn();

// const signatureServiceSuccess = new SignatureApiService(new MockHttpAdapter({
//   '/v1/v1/usuarios/logado/senha/transacao/validacao': {
//     headers: {},
//     status: 200,
//     url: '/v1/v1/usuarios/logado/senha/transacao/validacao',
//     data: {
//       Retorno: {
//         Id: 1,
//         Assinatura: '123456',
//       },
//     },
//   },
// }));

// const renderComponent = async (cardData: FavoredType, favoredService: FavoredApiService) => {
const renderComponent = async (cardData: any) => {
  const component = render(
    <ModalProvider>
      <TeamMembers
        itemData={cardData}
        onItemPress={onCardPressMock}
        onItemDeleted={onContactDeletedMock}
        isAdminUser
      />
    </ModalProvider>,
  );
  await waitFor(() => component.UNSAFE_getByType(TeamMembers));
  return component;
};

beforeEach(() => {
  jest.clearAllMocks();
});

// const expectedData = {
//   headers: {},
//   status: 200,
//   url: '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas',
//   data: {
//     Retorno: true,
//   },
// };
// const mockAdapterDefault = new MockHttpAdapter({
//   '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas': expectedData,
// });
// const serviceMock = new FavoredApiService(mockAdapterDefault);

// const favoredResponseData = {
//   headers: {},
//   status: 200,
//   url: '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172',
//   data: {
//     Retorno: true,
//   },
// };
// const mockAdapter = new MockHttpAdapter({
//   '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172': favoredResponseData,
// });
// const serviceDeleteMock = new FavoredApiService(mockAdapter);

const favoredDataMock = {
  Sequencial: '35172',
  Chave: {
    Codigo: '',
    // TipoChave: PixKeyType.MANUAL,
  },
  Conta: {
    NumeroConta: '4748402',
    TipoConta: 'CC',
    NumeroAgencia: 1,
    Documento: '10011450975',
    ISPBCodigo: '60850229',
    ISPBNome: '',
    Nome: 'Jon Doe',
  },
  Favorito: false,
  ContatoSeguro: false,
  MesmaTitularidade: false,
};

// const secureContactDataMock = {
//   Sequencial: '35172',
//   Chave: {
//     Codigo: '',
//     TipoChave: PixKeyType.MANUAL,
//   },
//   Conta: {
//     NumeroConta: '4748402',
//     TipoConta: 'CC',
//     NumeroAgencia: 1,
//     Documento: '10011450975',
//     ISPBCodigo: '60850229',
//     ISPBNome: '',
//     Nome: 'Jon Doe',
//   },
//   Favorito: false,
//   ContatoSeguro: true,
//   MesmaTitularidade: false,
// };

// const contactWithKeyDataMock = {
//   Sequencial: '35057',
//   Chave: {
//     Codigo: '16975032092',
//     TipoChave: PixKeyType.CPF,
//   },
//   Conta: {
//     NumeroConta: '0',
//     TipoConta: '',
//     NumeroAgencia: 0,
//     Documento: '750320',
//     ISPBCodigo: '',
//     ISPBNome: '',
//     Nome: 'Jon Doe',
//   },
//   Favorito: false,
//   ContatoSeguro: true,
//   MesmaTitularidade: false,
// };

describe('TeamMembers', () => {
  it('Should match snapshot', async () => {
    const component = await renderComponent(favoredDataMock);

    expect(component).toMatchSnapshot();
  });
  it('Should render card and open menu options', async () => {
    const component = await renderComponent(favoredDataMock);

    component.getByText('Jon Doe');
    component.getByText('Agência: 1');
    component.getByText('Conta: 474840-2');

    const buttonMenu = component.getByTestId('icon-dots');
    fireEvent.press(buttonMenu);

    await component.findByText('o que deseja fazer?');
    component.getByText('Excluir contato');
    component.getByText('Salvar contato de confiança');
  });
  // it('Should open menu options without save secure contact button', async () => {
  //   const component = await renderComponent(secureContactDataMock, serviceMock);

  //   component.getByText('Jon Doe');

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   await component.findByText('o que deseja fazer?');
  //   expect(component.queryByText('Salvar contato de confiança')).toBeNull();
  // });

  // it('Should render card without account number and with CPF key', async () => {
  //   const component = await renderComponent(contactWithKeyDataMock, serviceMock);

  //   component.getByText('Jon Doe');
  //   expect(component.queryByText('Agência: 0')).toBeNull();
  //   expect(component.queryByText('Conta: 0')).toBeNull();
  //   component.getByText('Chave Pix 169.750.320-92');
  // });
  // it('Should render card secure contact', async () => {
  //   const component = await renderComponent({ ...contactWithKeyDataMock, ContatoSeguro: true }, serviceMock);

  //   component.getByText('Jon Doe');
  //   component.getByTestId('icon-star');
  // });
  // it('Should validate delete bottom sheet and confirm exclusion', async () => {
  //   const component = await renderComponent(favoredDataMock, serviceDeleteMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonDelete = await component.findByText('Excluir contato');
  //   fireEvent.press(buttonDelete);

  //   await component.findByText('Deseja excluir este contato?');
  //   component.getByText('Tem certeza que deseja excluir a conta de Jon Doe?');
  //   const deleteContact = component.getByText('Sim, excluir');
  //   fireEvent.press(deleteContact);

  //   await component.findByText('Contato excluído');
  //   const buttonOk = component.getByText('Ok');
  //   fireEvent.press(buttonOk);

  //   await waitForElementToBeRemoved(() => component.queryByText('Contato excluído'));
  //   expect(onContactDeletedMock).toHaveBeenCalled();
  // });
  // it('Should delete secure contact', async () => {
  //   const component = await renderComponent(secureContactDataMock, serviceDeleteMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonDelete = await component.findByText('Excluir contato');
  //   fireEvent.press(buttonDelete);

  //   await component.findByText('Deseja excluir este contato de confiança?');
  //   component.getByText('Se quiser adicionar novamente, terá que aguardar de 24h a 48h para efetivação do cadastro');
  //   const deleteContact = component.getByText('Sim, excluir');
  //   fireEvent.press(deleteContact);

  //   await component.findByText('Contato excluído');
  //   const buttonOk = component.getByText('Ok');
  //   fireEvent.press(buttonOk);

  //   await waitForElementToBeRemoved(() => component.queryByText('Contato excluído'));
  //   expect(onContactDeletedMock).toHaveBeenCalled();
  // });
  // it('Should validate exclusion request error', async () => {
  //   const mockAdapterError = new MockHttpAdapter({
  //     '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172': {
  //       headers: {},
  //       status: 500,
  //       url: '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172',
  //       data: {
  //         Retorno: true,
  //       },
  //       error: 'UNKNOWN',
  //     },
  //   });
  //   const serviceDeleteErrorMock = new FavoredApiService(mockAdapterError);

  //   const component = await renderComponent(favoredDataMock, serviceDeleteErrorMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonDelete = await component.findByText('Excluir contato');
  //   fireEvent.press(buttonDelete);

  //   await component.findByText('Deseja excluir este contato?');
  //   component.getByText('Tem certeza que deseja excluir a conta de Jon Doe?');
  //   const deleteContact = component.getByText('Sim, excluir');
  //   fireEvent.press(deleteContact);

  //   await component.findByText('Ocorreu um erro');
  // });
  // it('Should validate exclusion request error type UNPROCESSABLE_ENTITY', async () => {
  //   const mockAdapterError = new MockHttpAdapter({
  //     '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172': {
  //       headers: {},
  //       status: 422,
  //       url: '/v1/v1/usuarios/logado/contas/atual/transacoes/pix/chaves/favorecidas/35172',
  //       data: {
  //         Mensagem: 'Erro ao excluir contato',
  //       },
  //       error: 'UNKNOWN',
  //     },
  //   });
  //   const serviceDeleteErrorMock = new FavoredApiService(mockAdapterError);

  //   const component = await renderComponent(favoredDataMock, serviceDeleteErrorMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonDelete = await component.findByText('Excluir contato');
  //   fireEvent.press(buttonDelete);

  //   await component.findByText('Deseja excluir este contato?');
  //   component.getByText('Tem certeza que deseja excluir a conta de Jon Doe?');
  //   const deleteContact = component.getByText('Sim, excluir');
  //   fireEvent.press(deleteContact);

  //   await component.findByText('Erro ao excluir contato');
  // });
  // it('Should validate delete bottom sheet and cancel exclusion', async () => {
  //   const component = await renderComponent(favoredDataMock, serviceDeleteMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonDelete = await component.findByText('Excluir contato');
  //   fireEvent.press(buttonDelete);

  //   await component.findByText('Deseja excluir este contato?');
  //   component.getByText('Tem certeza que deseja excluir a conta de Jon Doe?');
  //   const deleteContact = component.getByText('Cancelar');
  //   fireEvent.press(deleteContact);

  //   await waitForElementToBeRemoved(() => component.queryByText('Deseja excluir este contato?'));
  // });
  // it('Should validate save contact bottom sheet and confirm save', async () => {
  //   const component = await renderComponent(favoredDataMock, serviceMock);

  //   const buttonMenu = component.getByTestId('icon-dots');
  //   fireEvent.press(buttonMenu);

  //   const buttonSave = await component.findByText('Salvar contato de confiança');
  //   fireEvent.press(buttonSave);

  //   await component.findByText('Contato de confiança');
  //   component.getByText('Por segurança, este cadastro pode levar de 24h à 48h para ser concluído.');
  //   component.getByText('Adicionar contato de confiança');
  //   component.getByText('Cancelar');

  //   const addContact = component.getByText('Adicionar contato de confiança');
  //   fireEvent.press(addContact);

  //   await component.findByText('Digite sua assinatura eletrônica de 6 dígitos');
  // });
  // it('Should validate render without onCardPress event', async () => {
  //   const component = render(
  //     <CardContact
  //       cardData={favoredDataMock}
  //       signatureService={signatureServiceSuccess}
  //       favoredService={serviceMock}
  //     />,
  //   );

  //   component.getByText('Jon Doe');
  //   fireEvent.press(component.getByTestId('card-contact'));

  //   await waitFor(() => expect(onCardPressMock).not.toHaveBeenCalled());
  // });

});
