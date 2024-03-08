import React, { useCallback } from 'react';

import {
  AlertModal,
  BottomSheet, BottomSheetPropsType, Container, MenuOption, Spacer, Text, useDismissAllModals, useModal, useTheme,
} from 'mapping-style-guide-rn';
import { CollaboratorsPropsType } from '../../api/SquadService';

type OptionsBottomSheetType = BottomSheetPropsType & {
  squadData: CollaboratorsPropsType;
  onItemDeleted?: () => void;
};

const OptionsBottomSheet = ({
  squadData, onDismiss, onItemDeleted, ...others
}: OptionsBottomSheetType) => {
  const theme = useTheme();
  const showModal = useModal();
  const dismissAllModals = useDismissAllModals();

  const handleCloseModal = useCallback(() => {
    dismissAllModals();
    onItemDeleted?.();
  }, [dismissAllModals, onItemDeleted]);

  const handleDeleteItem = useCallback(() => {
    showModal(AlertModal, {
      title: 'Item excluído com sucesso!',
      description: 'Item excluído com sucesso. Esse item não será mostrado na lista.',
      primaryButtonName: 'Ok',
      onPressPrimary: handleCloseModal,
    });
    onDismiss?.();
  }, [squadData, onDismiss, showModal, onItemDeleted]);

  const handleEditItemList = useCallback(() => {
    // TODO: editar item da lista
    onDismiss?.();
  }, [squadData,  onDismiss, showModal]);

  return (
    <BottomSheet {...others} onDismiss={onDismiss} testID='squad-members-bottom-sheet'>
      <BottomSheet.Title>O que deseja fazer?</BottomSheet.Title>
      <Text>Escolha uma opção</Text>
      <Spacer size={theme.spacings.sLarge} />
      <Container>
        <MenuOption onPress={handleEditItemList} description="Edite as informações">
          Editar item da lista
        </MenuOption>
        <MenuOption onPress={handleDeleteItem} description="Retire item da sua lista">
          Excluir item da lista
        </MenuOption>
      </Container>
    </BottomSheet>
  );
};

export default OptionsBottomSheet;
