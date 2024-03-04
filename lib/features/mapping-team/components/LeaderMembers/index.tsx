import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Icons,
  Spacer,
  Text,
  useModal,
  useTheme,
  useViewStyles,
} from 'mapping-style-guide-rn';

import OptionsBottomSheet from './OptionsBottomSheet';
import { SquadPropsType } from '../../api/SquadService';

type LeaderMembersType = {
  itemData: SquadPropsType;
  onItemPress?: (data: SquadPropsType) => void;
  onItemDeleted?: () => void;
  isAdminUser: boolean;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '88%',
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const LeaderMembers = ({
  itemData, onItemPress, onItemDeleted, isAdminUser,
}: LeaderMembersType) => {
  const theme = useTheme();
  const showModal = useModal();

  const containerItemStyles = useViewStyles(() => [
    styles.containerCard,
    { paddingRight: theme.spacings.sXXS },
  ], [theme]);

  const handleBulletPress = useCallback(() => {
    showModal(OptionsBottomSheet, {
      squadData: itemData, onItemDeleted,
    });
  }, [showModal, itemData, onItemDeleted]);

  const handleItemPress = useCallback(() => {
    onItemPress?.(itemData);
  }, [onItemPress, itemData]);

  return (
    <TouchableOpacity
      testID="item-list"
      activeOpacity={onItemPress ? 0 : 1}
      style={containerItemStyles}
      onPress={handleItemPress}
    >
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <Text variant="body" weight="bold" color="neutralGray700" numberOfLines={1}>{itemData.Name}</Text>
          <Spacer size={theme.spacings.sNano} />
        </View>
        <Spacer size={theme.spacings.sQuark} />
        <Text>{itemData.Manager}</Text>
      </View>
      {isAdminUser && <Icons.Default.MenuDots
          width={24}
          height={24}
          testID="icon-dots"
          onPress={handleBulletPress}
        />}
    </TouchableOpacity>
  );
};

export default LeaderMembers;
