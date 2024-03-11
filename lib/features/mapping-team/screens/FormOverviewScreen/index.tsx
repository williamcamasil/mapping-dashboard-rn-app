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
} from 'mapping-style-guide-rn';
import { RouteProp } from '@react-navigation/native';
import NavigatorParamList from '../../navigation/types';

type FormOverviewScreenPropsType = {
  route: RouteProp<NavigatorParamList, 'FormOverviewScreen'>;
};

type InputSelectValueType<Item> = {
  key: string;
  label: string;
  item: Item;
};

type OfficeType = {
  id: number;
  office: string;
};

type StructureType = {
  id: number;
  type: string;
};

type InputSelectResponseType<Item> = Promise<{
  canLoadMore: boolean;
  result: Item[];
}>;

type FormValues = {
  structure: StructureType;
  name: string;
  office: OfficeType;
};

const listOfficeItem = [
  {
    id: 1,
    office: 'Desenvolvedor Front End',
  },
  {
    id: 2,
    office: 'Desenvolvedor Back End',
  },
  {
    id: 3,
    office: 'Gestor',
  },
  {
    id: 4,
    office: 'Tech Leader',
  },
  {
    id: 5,
    office: 'Coordenador',
  },
  {
    id: 6,
    office: 'Gerente de Projetos',
  },
  {
    id: 7,
    office: 'CO do projeto',
  },
];

const listStructureItem = [
  {
    id: 1,
    type: 'Equipe',
  },
  {
    id: 2,
    type: 'Organograma',
  },
];

const FormOverviewScreen = wrapForm<FormOverviewScreenPropsType, FormValues>(
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
    if (!values.structure || !values.name || !values.office) {
      setIsButtonEnabled(true);
      return;
    }
    setIsButtonEnabled(false);
  }, [values]);

  useDidMount(() => {
    console.log('formType: ', formType);
    console.log('editedItem: ', editedItem);
    if (formType === 'create') {
      form.reset();
      return;
    }

    // * Foi mantido o index 0 a nível como exemplo
    form.initialize({
      structure: mapStructureRecord(listStructureItem[0]),
      name: editedItem!.Name,
      office: mapOfficeRecord(listOfficeItem[0]),
    });
  });

  // * aqui seria salvo os dados no banco de dados
  const handleFormSubmit: OnSubmitFormType<FormValues> = useCallback(async values => {
    const { structure, name, office } = values;

    console.log('structure: ', structure);
    console.log('name: ', name);
    console.log('office: ', office);

    navigation.replace('OverviewScreen');
  }, [navigation]);

  const handleStructureInputValidation = useCallback((value?: InputSelectValueType<StructureType>) => (value ? undefined : 'Campo obrigatório'), []);
  const handleOfficeInputValidation = useCallback((value?: InputSelectValueType<OfficeType>) => (value ? undefined : 'Campo obrigatório'), []);

  const requestOfficeRecords = useCallback(async (): InputSelectResponseType<OfficeType> => {
    // * const result = await officeDataService.getOfficeList();
    // * if (isResponseError(result)) {
    // *   showCommonErrors(showModal, result);
    // *   return {
    // *     canLoadMore: false,
    // *     result: [],
    // *   };
    // * }

    return {
      canLoadMore: false,
      result: listOfficeItem,
    };
  }, []);

  const requestStructureRecords = useCallback(async (): InputSelectResponseType<StructureType> => {
    // * const result = await structureDataService.getStructureList();
    // * if (isResponseError(result)) {
    // *   showCommonErrors(showModal, result);
    // *   return {
    // *     canLoadMore: false,
    // *     result: [],
    // *   };
    // * }

    return {
      canLoadMore: false,
      result: listStructureItem,
    };
  }, []);

  const mapStructureRecord = useCallback((item: StructureType): any => ({
    label: capitalizeText(item.type),
    key: String(item.id),
    item,
  }), []);

  const mapOfficeRecord = useCallback((item: OfficeType): any => ({
    label: capitalizeText(item.office),
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
            name="structure"
            label="Estrutura"
            searchLabel="Estrutura"
            requestRecords={requestStructureRecords}
            mapRecord={mapStructureRecord}
            required
            validate={handleStructureInputValidation}
            showSearch={false}
            navigationBarTitle="Estrutura"
            />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID='input-name'
            label="Nome"
            name="name"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputSelect.Field
            name="office"
            label="Cargo"
            searchLabel="Cargo"
            requestRecords={requestOfficeRecords}
            mapRecord={mapOfficeRecord}
            required
            validate={handleOfficeInputValidation}
            showSearch={false}
            navigationBarTitle="Cargo"
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

export default FormOverviewScreen;
