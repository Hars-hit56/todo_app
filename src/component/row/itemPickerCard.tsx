import React from 'react';
import {StyleProp, StyleSheet, TextStyle, TouchableOpacity} from 'react-native';
import commonStyle from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import colors from '../../utility/colors';
import Image from '../common/Image';
import RegularText from '../common/RegularText';

type ItemPickerCardProps = {
  item: Record<string, string>;
  index: number;
  onSelectItem: (item: Record<string, any>) => void;
  displayKey: string;
  textStyle?: StyleProp<TextStyle>;
};

const ItemPickerCard = ({
  item,
  index,
  onSelectItem,
  displayKey,
  textStyle,
}: ItemPickerCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.dropDownRowMainContainer,
        index === 0 && {marginTop: spacing.MARGIN_10},
      ]}
      onPress={() => onSelectItem(item)}>
      <Image source={item.icon} />
      <RegularText style={[styles.dropDownRowContent, textStyle]}>
        {item[displayKey]}
      </RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dropDownRowMainContainer: {
    padding: spacing.PADDING_10,
    // borderWidth: 1,
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_20,
  },
  dropDownRowContent: {
    color: colors.black,
    fontFamily: fontNames.FONT_FAMILY_REGULAR,
    fontSize: textScale(14),
  },
});

export default ItemPickerCard;
