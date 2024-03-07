import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  getNavigationHolder,
} from 'mapping-context-rn';
import {
  Container,
  useTheme,
  Spacer,
  Text,
  NavigationBar,
  useViewStyles,
  Divider,
} from 'mapping-style-guide-rn';
import { RouteProp } from '@react-navigation/native';
import NavigatorParamList from '../../navigation/types';

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
  const userSelected = route.params.itemSelected;

  const scrollViewStyles = useViewStyles(() => [
    { padding: theme.spacings.sLarge },
  ], [theme]);

  const descriptionStyles = useViewStyles(() => [
    { marginVertical: theme.spacings.sXS },
  ], [theme]);

  const handleBackPress = useCallback(() => {
    getNavigationHolder().goBack();
  }, []);

  return (
    <Container>
      <NavigationBar onBackPress={handleBackPress} addDivider />
      <ScrollView contentContainerStyle={scrollViewStyles}>
        <Text variant="headingSmall" weight="bold" color="neutralGray700">{userSelected?.Name}</Text>
        <Spacer size={theme.spacings.sXXS} />
        <Text color="neutralGray700">{userSelected?.Office}</Text>
        <Spacer size={theme.spacings.sLarge} />
        <Text weight="bold" color="neutralGray700">Projeto: <Text color="neutralBlack">{userSelected.Project}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">Equipe: <Text color="neutralBlack">{userSelected.Squad}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">Empresa: <Text color="neutralBlack">{userSelected.Company}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">Conhecimentos: <Text color="neutralBlack">{userSelected.Skills}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">E-mail: <Text color="neutralBlack">{userSelected.Email}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">Localização: <Text color="neutralBlack">{userSelected.Location}</Text></Text>
        <Divider style={descriptionStyles} />
        <Text weight="bold" color="neutralGray700">Responsabilidades: <Text color="neutralBlack">{userSelected.Responsibilities}</Text></Text>
        <Divider style={descriptionStyles} />
      </ScrollView>
    </Container>
  );
};

export default CollaboratorScreen;
