import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet, View,
} from 'react-native';

import {
  getNavigationHolder,
  useAppContext,
  useAsync,
  useDidMount,
  useNavigationHolder,
} from 'mapping-context-rn';
import {
  Container,
  useTheme,
  Spacer,
  Text,
  Button,
  NavigationBar,
  useViewStyles,
  useModal,
  Divider,
  MenuOption,
  Icons,
  LoadingContainer,
} from 'mapping-style-guide-rn';
import { RouteProp } from '@react-navigation/native';
import NavigatorParamList from '../../navigation/types';
import { ChartScreenPropsType, CollaboratorsPropsType, SquadPropsType } from '../../api/SquadService';
import SquadMembers from '../../components/SquadMembers';

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type CollaboratorScreenPropsType = {
  route: RouteProp<NavigatorParamList, 'CollaboratorScreen'>;
};

const CollaboratorScreen = ({
  route,
}: CollaboratorScreenPropsType) => {
  const theme = useTheme();
  const navigation = useNavigationHolder();
  const userSelected = route.params.itemSelected;
  const showModal = useModal();
  const [itemList, setItemList] = useState<SquadPropsType>();

  const scrollViewStyles = useViewStyles(() => [
    { padding: theme.spacings.sLarge },
  ], [theme]);

  const handleAddNewItem = useCallback(() => {
    getNavigationHolder().navigate('CreateNewItem');
  }, []);

  // const handleSelectedItem = useCallback((itemSelected: SquadPropsType) => {
  //   // console.log('item selecionado: ', itemSelected.Collaborators[0]);
  //   getNavigationHolder().navigate('SquadScreen', { collaborators: itemSelected });
  // }, []);

  const handleBackPress = useCallback(() => {
    getNavigationHolder().goBack();
  }, []);

  return (
    <Container>
      <NavigationBar onBackPress={handleBackPress} addDivider />
      <ScrollView contentContainerStyle={scrollViewStyles}>
        <Text variant="headingSmall" weight="bold" color="neutralGray700">{userSelected?.Name}</Text>
        <Text color="neutralGray700">Responsabilidades: <Text weight="bold">{userSelected?.Office}</Text></Text>
        <Spacer size={theme.spacings.sLarge} />
        <Text weight="bold" color="neutralGray700">Projeto: {userSelected.Project}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">Equipe: {userSelected?.Squad}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">Empresa: {userSelected.Company}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">Conhecimentos: {userSelected?.Skills}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">E-mail: {userSelected.Email}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">Localização: {userSelected.Location}</Text>
        <Spacer size={theme.spacings.sXS} />
        <Text weight="bold" color="neutralGray700">Responsabilidades: {userSelected.Responsibilities}</Text>
        <Spacer size={theme.spacings.sXS} />
      </ScrollView>
    </Container>
  );
};

export default CollaboratorScreen;
