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
import TeamMembers from '../../components/TeamMembers';
import { MemberPropsType, OverviewScreenPropsType, TeamStructureEnum, teamList } from '../../api/TeamService';

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const OverviewScreen = () => {
  const theme = useTheme();
  const { loggedUser } = useAppContext();
  const showModal = useModal();
  const [itemList, setItemList] = useState<OverviewScreenPropsType>();

  const scrollViewStyles = useViewStyles(() => [
    { padding: theme.spacings.sLarge },
  ], [theme]);

  // const isAdminUser = teamList.userType === AccessTypeEnum.ADMIN;

  const { call: handleListItens, loading } = useAsync(async () => {
    // const responseData = await teamService.getTeamList();

    // if (isResponseError(responseData)) {
    //   showCommonErrors(showModal, responseData);
    //   return;
    // }

    setItemList(teamList);
  }, [showModal]);

  useDidMount(() => {
    console.log('state?.isAdminUser!: ', loggedUser?.isAdminUser!);
    handleListItens();
  });

  const handlePressItem = useCallback((itemPressed: MemberPropsType) => {
    if(itemPressed.Structure === TeamStructureEnum.ORGANOGRAMA) {
      getNavigationHolder().navigate('ChartScreen');
      return;
    }
    getNavigationHolder().navigate('CollaboratorScreen', { itemSelected: itemPressed.Collaborator });
  }, []);

  const handleAddNewItem = useCallback(() => {
    getNavigationHolder().navigate('FormOverviewScreen', { formType: 'create' });
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
            <Text color="neutralGray700" weight="bold">Novo</Text>
          </View>
        </MenuOption>
      </>
    );
  };

  const renderSquadList = () => {
    if (loading || !itemList) return null;

    if (!itemList.members.length) {
      return (<Text>Não existem itens cadastrados ainda na lista, adicione novos itens clicando no botão Novo acima.</Text>);
    }

    return itemList.members.map((member: MemberPropsType) => (
      <View key={member.Id}>
        <Spacer size={theme.spacings.sSmall} />
        <TeamMembers
          itemData={member}
          onItemPress={handlePressItem}
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
        <Text variant="headingSmall" weight="bold" color="neutralGray700">Estrutura de projeto do time {itemList?.team}</Text>
        {renderAddNewItemList()}
        <Spacer size={theme.spacings.sLarge} />
        <Text weight="bold" color="neutralGray700">Equipe:</Text>
        <Spacer size={theme.spacings.sXS} />
        {renderSquadList()}
      </ScrollView>
      <LoadingContainer visible={loading} />
    </Container>
  );
};

export default withPropsInjection(OverviewScreen, {});
