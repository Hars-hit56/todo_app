import React from 'react';
import {
  ActivityIndicator,
  ColorValue,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import {fontNames} from '../../../styles/typography';
import colors from '../../../utility/colors';
import Image from '../../common/Image';
import RegularText from '../RegularText';

interface ButtonProps {
  backgroundColor?: ColorValue;
  title: string;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPressButton: () => void;
  disabled?: boolean;
  fetching?: boolean;
  rightImage?: any;
  rightImageStyle?: StyleProp<ImageStyle>;
  leftImage?: any;
  leftImageStyle?: StyleProp<ImageStyle>;
  activityIndicatorColor?: ColorValue;
  isSecondary?: boolean;
  testID?: string;
}

const Button = ({
  backgroundColor,
  title,
  textStyle,
  buttonStyle,
  onPressButton,
  disabled,
  fetching,
  rightImage,
  rightImageStyle,
  leftImage,
  leftImageStyle,
  activityIndicatorColor,
  isSecondary,
  testID,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonStyle,
        buttonStyle,
        {
          backgroundColor: isSecondary
            ? backgroundColor || colors.white
            : backgroundColor || colors.theme,
          borderColor: backgroundColor || colors.theme,
        },
        disabled && {
          backgroundColor: colors.lightTheme02,
          borderColor: colors.lightTheme02,
        },
        // isSecondary && { backgroundColor : colors}
      ]}
      onPress={() => {
        if (!fetching) {
          onPressButton();
        }
      }}
      testID={testID}>
      {!fetching && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {leftImage ? (
            <View style={{alignItems: 'flex-end'}}>
              <Image source={leftImage} style={leftImageStyle} />
            </View>
          ) : null}
          <RegularText
            style={[
              styles.textStyle,
              isSecondary && {color: colors.theme},
              textStyle,
            ]}>
            {title}
          </RegularText>
          {rightImage ? (
            <View style={{alignItems: 'flex-end'}}>
              <Image source={rightImage} style={rightImageStyle} />
            </View>
          ) : null}
        </View>
      )}
      {fetching == true && (
        <ActivityIndicator
          color={activityIndicatorColor || colors.white}
          size="small"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: spacing.RADIUS_8,
    paddingHorizontal: spacing.PADDING_12,
    height: spacing.HEIGHT_48,
    justifyContent: 'center',
    borderWidth: spacing.WIDTH_2,
  },
  textStyle: {
    color: colors.white,
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_FAMILY_BOLD,
  },
});

export default Button;
