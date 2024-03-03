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

  const goToNextPage = useCallback(() => {
    navigation.navigate('MappingTeamNavigation');
  }, [navigation]);

  return (
    <Container padding={theme.spacings.sLarge}>
      <Text>
        Dashboard
      </Text>
      <Spacer size={theme.spacings.sLarge} />
      <Button
        testID="activate-credit-landing-page-next-button"
        variant="containedPrimary"
        size="large"
        onPress={goToNextPage}
      >
        Equipe
      </Button>
    </Container>
  );
};

export default DashboardScreen;
