import React from 'react';
import {
  ColorValue,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {boxShadowTwo} from '../../../styles/Mixins';
import commonStyle, {
  APP_PADDING_HORIZONTAL,
} from '../../../styles/commonStyles';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';
import Title from '../Title';
import BackButton from '../buttons/BackButton';

type HeaderProps = {
  backText?: string;
  backgroundColor?: ColorValue;
  backArrowTintColor?: ColorValue;
  statusBartheme?: StatusBarStyle;
  onPressBack?: () => void;
  title?: string;
  mainContainerStyle?: StyleProp<ViewStyle>;
};

const Header = ({
  backText,
  backgroundColor,
  mainContainerStyle,
  backArrowTintColor,
  onPressBack,
  title,
}: HeaderProps) => {
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: backgroundColor ? backgroundColor : colors.white},
        mainContainerStyle,
      ]}>
      <BackButton
        text={backText || ' '}
        backArrowTintColor={backArrowTintColor}
        onBack={onPressBack}
      />
      <Title title={title || ''} style={styles.title} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    ...commonStyle.flexDirectionRow,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_12,
    ...boxShadowTwo(),
    minHeight: spacing.HEIGHT_58,
  },
  title: {
    color: colors.black,
  },
});

export default Header;
