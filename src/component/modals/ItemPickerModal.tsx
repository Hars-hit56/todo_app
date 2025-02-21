import React from 'react';
import {StyleSheet} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import CommonModal from '../common/modal/CommonModal';
import RegularText from '../common/RegularText';
import ItemPickerList from '../modules/ItemPickerList';

type ItemPickerModalProps = {
  visible?: boolean;
  onClose: () => void;
  data: Record<string, string>[];
  displayKey: string;
  onSelectItem: (item: Record<string, string>) => void;
};

const ItemPickerModal = ({
  visible,
  onClose,
  data,
  displayKey,
  onSelectItem,
}: ItemPickerModalProps) => {
  return (
    <CommonModal
      modalProps={{
        visible: visible,
        onRequestClose: onClose,
      }}
      visibleViewStyle={[{maxHeight: '40%'}, {paddingHorizontal: 0}]}>
      <RegularText style={styles.titleStyle}>Sort by</RegularText>
      <ItemPickerList
        data={data}
        displayKey={displayKey}
        onSelectItem={onSelectItem}
        mainStyleView={[data.length > 5 && {marginBottom: spacing.MARGIN_24}]}
      />
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    fontSize: textScale(14),
  },
});

export default ItemPickerModal;
