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
import { MemberPropsType } from '../../api/TeamService/utils';

type TeamMembersItemType = {
  itemData: MemberPropsType;
  onItemPress?: (data: MemberPropsType) => void;
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

const TeamMembersItem = ({
  itemData, onItemPress, onItemDeleted, isAdminUser,
}: TeamMembersItemType) => {
  const theme = useTheme();
  const showModal = useModal();

  const containerItemStyles = useViewStyles(() => [
    styles.containerCard,
    { paddingRight: theme.spacings.sXXS },
  ], [theme]);

  const handleBulletPress = useCallback(() => {
    showModal(OptionsBottomSheet,{
      squadData: itemData, onItemDeleted,
    });
  }, [showModal, itemData, onItemDeleted]);

  const handleItemPress = useCallback(() => {
    onItemPress?.(itemData);
  }, [onItemPress, itemData]);

  const renderIconStar = () => {
    if (!itemData.Main) return null;

    return (
      <Icons.Default.Star
        testID="icon-star"
        width={theme.spacings.sXS}
        height={theme.spacings.sXS}
        color={theme.colors.primary400}
      />
    );
  };

  return (
    <TouchableOpacity
      testID="item-list"
      style={containerItemStyles}
      onPress={handleItemPress}
    >
      <View style={styles.container}>
        <View style={styles.containerRow}>
          <Text variant="body" weight="bold" color="neutralGray700" numberOfLines={1}>{itemData.Name}</Text>
          <Spacer size={theme.spacings.sNano} />
          {renderIconStar()}
        </View>
        <Spacer size={theme.spacings.sQuark} />
        <Text>{itemData.Type}</Text>
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

export default TeamMembersItem;
