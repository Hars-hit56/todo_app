import React, {useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
  TextStyle,
  View,
} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import {fontNames} from '../../../styles/typography';
import colors from '../../../utility/colors';
import {APP_PADDING_HORIZONTAL} from '../../../styles/commonStyles';
import Image from '../../common/Image';
import RegularText from '../RegularText';

interface FabButtonProps {
  onPressButton?: () => void;
  title?: string;
  testID?: string;
  titleStyle?: StyleProp<TextStyle>;
  leftImage?: any;
  leftImageStyle?: StyleProp<ImageStyle>;
  rightImage?: any;
  disabled?: boolean;
  rightImageStyle?: StyleProp<ImageStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  overlay?: boolean;
}

const FabButton = ({
  onPressButton = () => {},
  title,
  titleStyle,
  leftImage,
  leftImageStyle,
  rightImage,
  rightImageStyle,
  mainContainerStyle,
  disabled,
  testID,
  loading,
  overlay,
}: FabButtonProps) => {
  const [ishovered, setIsHovered] = useState(false);

  return (
    <TouchableOpacity
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
      activeOpacity={1}
      onPress={() => onPressButton()}
      disabled={disabled}
      testID={testID}
      style={[
        styles.mainContainer,
        disabled && {opacity: 0.6},
        ishovered && {backgroundColor: colors.lightTheme02},
        mainContainerStyle,
      ]}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <>
          {overlay && (
            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: colors.lightTheme01,
                },
              ]}
            />
          )}
          {leftImage && <Image source={leftImage} style={leftImageStyle} />}
          {title && (
            <RegularText style={[styles.title, titleStyle]}>
              {title}
            </RegularText>
          )}
          {rightImage && <Image source={rightImage} style={rightImageStyle} />}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    bottom: spacing.MARGIN_30,
    right: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_90,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: spacing.WIDTH_70,
    minHeight: spacing.WIDTH_70,
    backgroundColor: colors.theme,
    overflow: 'hidden',
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  title: {
    color: colors.white,
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    fontSize: textScale(15),
    alignSelf: 'center',
  },
});

export default FabButton;
