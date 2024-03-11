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

type FormSquadScreenPropsType = {
  route: RouteProp<NavigatorParamList, 'FormSquadScreen'>;
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

type SquadType = {
  id: number;
  type: string;
};

type InputSelectResponseType<Item> = Promise<{
  canLoadMore: boolean;
  result: Item[];
}>;

type FormValues = {
  name: string;
  office: OfficeType;
  project: string;
  squad: SquadType;
  company: string;
  skills: string;
  email: string;
  location: string;
  responsibilities: string;
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
];

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

const FormSquadScreen = wrapForm<FormSquadScreenPropsType, FormValues>(
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
    const isInputsEmpty = !values.name || !values.office || !values.project
                          || !values.squad || !values.company || !values.skills
                          || !values.email || !values.location || !values.responsibilities;

    if (isInputsEmpty) {
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
      name: editedItem!.Name,
      office: mapOfficeRecord(listOfficeItem[0]),
      project: editedItem!.Project,
      squad: mapStructureRecord(listSquadItem[0]),
      company: editedItem!.Company,
      skills: editedItem!.Skills,
      email: editedItem!.Email,
      location: editedItem!.Location,
      responsibilities: editedItem!.Responsibilities,
    });
  });

  const handleFormSubmit: OnSubmitFormType<FormValues> = useCallback(
    async values => {
      const { name, office, project, squad, company, skills, email, location, responsibilities } = values;

      console.log('name: ', name);
      console.log('office: ', office);
      console.log('project: ', project);
      console.log('squad: ', squad);
      console.log('company: ', company);
      console.log('skills: ', skills);
      console.log('email: ', email);
      console.log('location: ', location);
      console.log('responsibilities: ', responsibilities);

      navigation.replace('OverviewScreen');
    },
    [navigation],
  );

  const handleSquadInputValidation = useCallback((value?: InputSelectValueType<SquadType>) => (value ? undefined : 'Campo obrigatório'), []);
  const handleOfficeInputValidation = useCallback((value?: InputSelectValueType<OfficeType>) => (value ? undefined : 'Campo obrigatório'), []);

  const requestOfficeRecords = useCallback(async (): InputSelectResponseType<OfficeType> => {
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
      result: listOfficeItem,
    };
  }, []);

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

  const mapStructureRecord = useCallback((item: SquadType): any => ({
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
          <InputText.Field
            testID="input-name"
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
          <InputText.Field
            testID="input-project"
            label="Projeto"
            name="project"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputSelect.Field
            name="squad"
            label="Squad"
            searchLabel="Squad"
            requestRecords={requestSquadRecords}
            mapRecord={mapStructureRecord}
            required
            validate={handleSquadInputValidation}
            showSearch={false}
            navigationBarTitle="Squad"
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-company"
            label="Empresa"
            name="company"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-skills"
            label="Conhecimentos"
            name="skills"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-email"
            label="E-mail"
            name="email"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-location"
            label="Localização"
            name="location"
            required
            disabled={submitting}
          />
          <Spacer size={theme.spacings.sLarge} />
          <InputText.Field
            testID="input-responsibilities"
            label="Responsabilidades"
            name="responsibilities"
            required
            disabled={submitting}
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

export default FormSquadScreen;
