import React from 'react';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from '../common/RegularText';
interface EmptyListProps {
  msg?: string;
  contentStyle?: StyleProp<TextStyle>;
  mainContaierStyle?: StyleProp<ViewStyle>;
}

const EmptyList = ({msg, contentStyle, mainContaierStyle}: EmptyListProps) => {
  return (
    <View style={[styles.mainContainer, mainContaierStyle]}>
      <RegularText style={[styles.content, contentStyle]}>
        {msg || 'No data'}
      </RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingVertical: APP_PADDING_HORIZONTAL * 2,
    backgroundColor: colors.appBackgroundColor,
    paddingHorizontal: APP_PADDING_HORIZONTAL * 2,
  },
  img: {},
  content: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_FAMILY_SEMI_BOLD,
  },
});

export default EmptyList;
