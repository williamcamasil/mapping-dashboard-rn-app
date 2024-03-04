import React, {
  useCallback, useState,
} from 'react';
import {
  ScrollView, StyleSheet, View,
} from 'react-native';

import {
  getNavigationHolder,
  useAppContext,
  useAsync,
  useDidMount,
  withPropsInjection,
} from 'mapping-context-rn';
import {
  Container,
  Divider,
  Icons,
  LoadingContainer,
  MenuOption,
  NavigationBar,
  Spacer,
  Text,
  useModal,
  useTheme,
  useViewStyles,
} from 'mapping-style-guide-rn';
import { ChartScreenPropsType, SquadPropsType, squadList } from '../../api/SquadService';
import LeaderMembers from '../../components/LeaderMembers';

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const ChartScreen = () => {
  const theme = useTheme();
  const { loggedUser } = useAppContext();
  const showModal = useModal();
  const [itemList, setItemList] = useState<ChartScreenPropsType>();

  const scrollViewStyles = useViewStyles(() => [
    { padding: theme.spacings.sLarge },
  ], [theme]);

  const { call: handleListItens, loading } = useAsync(async () => {
    // const responseData = await teamService.getTeamList();

    // if (isResponseError(responseData)) {
    //   showCommonErrors(showModal, responseData);
    //   return;
    // }

    setItemList(squadList);
  }, [showModal]);

  useDidMount(() => {
    handleListItens();
  });

  const handleAddNewItem = useCallback(() => {
    getNavigationHolder().navigate('FormChartScreen', { formType: 'create' });
  }, []);

  const handleSelectedItem = useCallback((itemSelected: SquadPropsType) => {
    getNavigationHolder().navigate('SquadScreen', { itemSelected: itemSelected });
  }, []);

  const handleBackPress = useCallback(() => {
    getNavigationHolder().goBack();
  }, []);

  const renderAddNewItemList = () => {
    if (!squadList) return null;

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

    if (!itemList.squads.length) {
      return (<Text>Não existem itens cadastrados ainda na lista, adicione novos itens clicando no botão Novo acima.</Text>);
    }

    return itemList.squads.map((squad: SquadPropsType) => (
      <View key={squad.Id}>
        <Spacer size={theme.spacings.sSmall} />
        <LeaderMembers
          itemData={squad}
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
        <Text variant="headingSmall" weight="bold" color="neutralGray700">Organização da equipe</Text>
        <Text color="neutralGray700">Organograma dos times: <Text weight="bold">{squadList.team}</Text></Text>
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

export default withPropsInjection(ChartScreen, {});
