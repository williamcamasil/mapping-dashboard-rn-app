import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import {
  useNavigationHolder,
} from 'mapping-context-rn';
import {
  Container,
  useTheme,
  Icons,
  Spacer,
  Link,
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
    navigation.replace('LOGIN');
  }, [navigation]);

  return (
    <Container>
      <Container padding={theme.spacings.sLarge} fillParent={false}>
        <View style={styles.containerLink}>
          <Link
            testID="link-help-center"
            variant="secondary"
            size="large"
            onPress={goToNextPage}
            Icon={Icons.Thin.Call}
          >
            Dashboard
          </Link>
        </View>
        <Spacer size={theme.spacings.sNano} />
      </Container>
    </Container>
  );
};

export default DashboardScreen;
