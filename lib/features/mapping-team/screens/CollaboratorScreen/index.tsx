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
  NavigationBar,
} from 'mapping-style-guide-rn';

const styles = StyleSheet.create({
  containerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const CollaboratorScreen = () => {
  const theme = useTheme();
  const navigation = useNavigationHolder();

  const goToNextPage = useCallback(() => {
    navigation.replace('CollaboratorScreen');
  }, [navigation]);

  return (
    <Container>
      <NavigationBar />
      <Container padding={theme.spacings.sLarge}>
        <Text>
          Collaborator Screen
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
    </Container>
  );
};

export default CollaboratorScreen;