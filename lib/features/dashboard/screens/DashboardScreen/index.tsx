import React, { useCallback } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  useNavigationHolder,
} from 'mapping-context-rn';
import {
  Container,
  useTheme,
  Spacer,
  Text,
  Button,
} from 'mapping-style-guide-rn';

const styles = StyleSheet.create({
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const DashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigationHolder();

  const handleLogout = useCallback(() => {
    navigation.replace('LOGIN');
  }, [navigation]);

  const handleSendNextPage = useCallback(() => {
    navigation.navigate('MappingTeamNavigation');
  }, [navigation]);

  return (
    <Container paddingHorizontal={theme.spacings.sLarge} paddingVertical={theme.spacings.sXXL}>
      <Text variant="headingSmall" weight="bold" color="neutralGray700">
        Dashboard
      </Text>
      <Spacer size={theme.spacings.sLarge} />
      <Button
        variant="outlinedPrimary"
        size="large"
        onPress={handleLogout}
      >
        Logout
      </Button>
      <Spacer size={theme.spacings.sLarge} />
      <Button
        variant="containedPrimary"
        size="large"
        onPress={handleSendNextPage}
      >
        Equipe
      </Button>
    </Container>
  );
};

export default DashboardScreen;
