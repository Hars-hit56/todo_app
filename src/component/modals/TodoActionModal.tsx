import React from 'react';
import {StyleSheet, View} from 'react-native';
import commonStyle, {APP_PADDING_HORIZONTAL} from '../../styles/commonStyles';
import {spacing} from '../../styles/spacing';
import colors from '../../utility/colors';
import Button from '../common/buttons/Button';
import CommonModal from '../common/modal/CommonModal';

type TodoActionModalProps = {
  visible?: boolean;
  onRequestClose: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
};

const TodoActionModal = ({
  visible,
  onRequestClose,
  onPressDelete,
  onPressEdit,
}: TodoActionModalProps) => {
  return (
    <CommonModal
      modalProps={{
        visible: visible,
        onRequestClose: onRequestClose,
        animationType: 'slide',
      }}
      visibleViewStyle={styles.visibleViewStyle}>
      <View style={styles.btnContainer}>
        <Button
          title="Delete"
          backgroundColor={colors.grey300}
          textStyle={{color: colors.black}}
          buttonStyle={styles.buttonStyle}
          onPressButton={onPressDelete}
        />
        <Button
          title="Edit"
          buttonStyle={styles.buttonStyle}
          onPressButton={onPressEdit}
        />
      </View>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  visibleViewStyle: {
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
    borderRadius: spacing.RADIUS_20,
    marginBottom: spacing.MARGIN_20,
    marginHorizontal: spacing.MARGIN_20,
    paddingHorizontal: spacing.PADDING_24,
  },
  btnContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_20,
  },
  buttonStyle: {
    flex: 1,
    borderRadius: spacing.RADIUS_20,
  },
});

export default TodoActionModal;
