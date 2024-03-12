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
import TeamMembersItem from '../../components/TeamMembersItem';
import { MemberPropsType, OverviewScreenPropsType, TeamStructureEnum } from '../../api/TeamService/utils';
import { serviceTeamList } from '../../api/TeamService';

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

  const { call: handleListItens, loading } = useAsync(async () => {
    // * A intenção dessa chamada é buscar a lista de membros do time, com o serviço real seria possível fazer uso do código abaixo
    // * const responseData = await teamService.getTeamList();
    // * if (isResponseError(responseData)) {
    // *   showCommonErrors(showModal, responseData);
    // *   return;
    // * }
    setItemList(serviceTeamList);
  }, [showModal]);

  useDidMount(() => { handleListItens(); });

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
            <Icons.Default.Plus2 color={theme.colors.primary400} />
            <Spacer size={theme.spacings.sXXS} />
            <Text color="neutralGray700" weight="bold">Novo</Text>
          </View>
        </MenuOption>
      </>
    );
  };

  const renderSquadList = () => {
    if (loading || !itemList) return null;

    // * esse fluxo foi comentado pois não existe endpoint que possam retornar os dados vazios
    // * if (!itemList.squads.length) {
    // *   return (<Text>Não existem itens cadastrados ainda na lista, adicione novos itens clicando no botão Novo acima.</Text>);
    // * }

    return itemList.members.map((member: MemberPropsType) => (
      <View key={member.Id}>
        <Spacer size={theme.spacings.sSmall} />
        <TeamMembersItem
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
