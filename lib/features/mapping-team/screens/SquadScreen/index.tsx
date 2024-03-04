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

type SquadScreenPropsType = {
  route: RouteProp<NavigatorParamList, 'SquadScreen'>;
};

const SquadScreen = ({
  route,
}: SquadScreenPropsType) => {
  const theme = useTheme();
  const navigation = useNavigationHolder();
  const teamList = route.params.itemSelected;
  const { loggedUser } = useAppContext();
  const showModal = useModal();
  const [itemList, setItemList] = useState<SquadPropsType>();

  const scrollViewStyles = useViewStyles(() => [
    { padding: theme.spacings.sLarge },
  ], [theme]);

  const { call: handleListItens, loading } = useAsync(async () => {
    // const responseData = await teamService.getTeamList();

    // if (isResponseError(responseData)) {
    //   showCommonErrors(showModal, responseData);
    //   return;
    // }

    setItemList(teamList);
  }, [showModal]);

  useDidMount(() => {
    handleListItens();
  });

  const handleAddNewItem = useCallback(() => {
    getNavigationHolder().navigate('FormSquadScreen', { formType: 'create' });
  }, []);

  const handleSelectedItem = useCallback((itemSelected: CollaboratorsPropsType) => {
    getNavigationHolder().navigate('CollaboratorScreen', { itemSelected: itemSelected });
  }, []);

  const handleBackPress = useCallback(() => {
    getNavigationHolder().goBack();
  }, []);

  const renderAddNewItemList = () => {
    if (!itemList) return null;

    if (!loggedUser?.isAdminUser) return null;

    return (
      <>
        <Spacer size={theme.spacings.sLarge} />
        <MenuOption onPress={handleAddNewItem}>
          <View style={styles.containerRow}>
            <Icons.Default.Plus2 color={theme.colors.secondary400} />
            <Spacer size={theme.spacings.sXXS} />
            <Text color="neutralGray700" weight="bold">Novo squad</Text>
          </View>
        </MenuOption>
      </>
    );
  };

  const renderSquadList = () => {
    if (loading || !itemList) return null;

    if (!itemList.Collaborators.length) {
      return (<Text>Não existem itens cadastrados ainda na lista, adicione novos itens clicando no botão Novo acima.</Text>);
    }

    return itemList.Collaborators.map((collaborator: CollaboratorsPropsType) => (
      <View key={collaborator.Id}>
        <Spacer size={theme.spacings.sSmall} />
        <SquadMembers
          itemData={collaborator}
          onItemPress={handleSelectedItem}
          onItemDeleted={handleListItens}
          isAdminUser={loggedUser?.isAdminUser!}
        />
        <Spacer size={theme.spacings.sSmall} />
        <Divider />
      </View>
    ));
  };

  return (
    <Container>
      <NavigationBar onBackPress={handleBackPress} addDivider />
      <ScrollView contentContainerStyle={scrollViewStyles}>
        <Text variant="headingSmall" weight="bold" color="neutralGray700">{itemList?.Name}</Text>
        <Text color="neutralGray700">Responsabilidades: <Text weight="bold">{itemList?.Description}</Text></Text>
        {renderAddNewItemList()}
        <Spacer size={theme.spacings.sLarge} />
        <Text weight="bold" color="neutralGray700">Squads:</Text>
        <Spacer size={theme.spacings.sXS} />
        {renderSquadList()}
      </ScrollView>
      <LoadingContainer visible={loading} />
    </Container>
  );
};

export default SquadScreen;
