import React, { useCallback, useState } from 'react';

import {
  capitalizeText,
  getNavigationHolder,
  useDidMount,
  useDidMountAndUpdate,
  useNavigationHolder,
} from 'mapping-context-rn';
import {
  Container,
  useTheme,
  Spacer,
  Button,
  NavigationBar,
  StackedContainer,
  InputText,
  wrapForm,
  OnSubmitFormType,
  InputSelect,
  InputTextArea,
} from 'mapping-style-guide-rn';
import { RouteProp } from '@react-navigation/native';
import NavigatorParamList from '../../navigation/types';

type FormChartScreenPropsType = {
  route: RouteProp<NavigatorParamList, 'FormChartScreen'>;
};

type InputSelectValueType<Item> = {
  key: string;
  label: string;
  item: Item;
};

type SquadType = {
  id: number;
  type: string;
};

type InputSelectResponseType<Item> = Promise<{
  canLoadMore: boolean;
  result: Item[];
}>;

type FormValues = {
  squad: SquadType;
  manager: string;
  description: string;
};

const listSquadItem = [
  {
    id: 1,
    type: 'Arquitetura',
  },
  {
    id: 2,
    type: 'Segurança',
  },
  {
    id: 3,
    type: 'Regulatório',
  },
  {
    id: 4,
    type: 'Operação',
  },
  {
    id: 5,
    type: 'Sustentação',
  },
  {
    id: 6,
    type: 'Negócios',
  },
  {
    id: 7,
    type: 'Serviços Bancário e Negócios PJ',
  },
];

const FormChartScreen = wrapForm<FormChartScreenPropsType, FormValues>(
  ({
    handleSubmit,
    values,
    submitting,
    form,
    route,
  }) => {
  const theme = useTheme();
  const navigation = useNavigationHolder();
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(true);
  const { editedItem, formType } = route.params;

  const title = formType === 'create' ? 'Criar' : 'Editar';

  const handleBackPress = useCallback(() => {
    getNavigationHolder().goBack();
  }, []);

  useDidMountAndUpdate(() => {
    if (!values.squad || !values.manager || !values.description) {
      setIsButtonEnabled(true);
      return;
    }
    setIsButtonEnabled(false);
  }, [values]);

  useDidMount(() => {
    if (formType === 'create') {
      form.reset();
      return;
    }

    // * Foi mantido o index 0 a nível como exemplo
    form.initialize({
      squad: mapSquadRecord(listSquadItem[0]),
      manager: editedItem.Name,
      description: editedItem.Description,
    });
  });

  const handleFormSubmit: OnSubmitFormType<FormValues> = useCallback(
    async values => {
      const { squad, manager, description } = values;

      console.log('structure: ', squad);
      console.log('name: ', manager);
      console.log('office: ', description);

      navigation.replace('ChartScreen');
    },
    [navigation],
  );

  const handleSquadInputValidation = useCallback((value?: InputSelectValueType<SquadType>) => (value ? undefined : 'Campo obrigatório'), []);

  const requestSquadRecords = useCallback(async (): InputSelectResponseType<SquadType> => {
    // * const result = await personalDataService.getMaritalStatuses();
    // * if (isResponseError(result)) {
    // *   showCommonErrors(showModal, result);
    // *   return {
    // *     canLoadMore: false,
    // *     result: [],
    // *   };
    // * }

    return {
      canLoadMore: false,
      result: listSquadItem,
    };
  }, []);

  const mapSquadRecord = useCallback((item: SquadType): any => ({
    label: capitalizeText(item.type),
    key: String(item.id),
    item,
  }), []);

  return (
    <StackedContainer
      headerContent={(
        <NavigationBar onBackPress={handleBackPress} addDivider title={title}/>
      )}
      topContent={
        <Container>
          <Spacer size={theme.spacings.sLarge} />
          <InputSelect.Field
            name="squad"
            label="Squad"
            searchLabel="Squad"
            requestRecords={requestSquadRecords}
            mapRecord={mapSquadRecord}
            required
            validate={handleSquadInputValidation}
            showSearch={false}
            navigationBarTitle="Squad"
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-name-manager"
            label="Gestor"
            name="manager"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputTextArea.Field
            testID="input-description"
            label="Descrição da Squad"
            name="description"
            required
            disabled={submitting}
            containerTextAreaStyle={{ paddingHorizontal: theme.spacings.sQuark}}
          />
          <Spacer size={theme.spacings.sLarge} />
        </Container>
      }
      bottomContent={(
        <Button
          size="large"
          variant="containedPrimary"
          disabled={isButtonEnabled}
          onPress={handleSubmit(handleFormSubmit)}
        >
          Salvar
        </Button>
      )}
    />
    );
  },
);

export default FormChartScreen;
