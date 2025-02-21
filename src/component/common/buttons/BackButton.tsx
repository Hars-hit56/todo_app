import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ColorValue,
  TextStyle,
} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import colors from '../../../utility/colors';
import {goBack} from '../../../utility/commonFunction';
import {Images} from '../../../utility/imagePaths';
import Image from '../../common/Image';
import RegularText from '../RegularText';

interface BackButtonProps {
  mainContainerStyle?: StyleProp<ViewStyle>;
  text?: string;
  onBack?: () => void;
  arrowStyle?: StyleProp<ViewStyle>;
  backArrowTintColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
}

const BackButton = ({
  mainContainerStyle,
  text,
  onBack,
  arrowStyle,
  backArrowTintColor,
  textStyle,
}: BackButtonProps) => {
  function onPressBack() {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  }

  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainContainerStyle]}
      onPress={() => onPressBack()}>
      <Image
        source={Images.IMG_ARROW_FORWARD}
        style={[
          styles.iconStyle,
          arrowStyle as any,
          {tintColor: backArrowTintColor ? backArrowTintColor : ''},
        ]}
      />
      <RegularText
        style={[
          styles.text,
          {color: backArrowTintColor ? backArrowTintColor : colors.grey900},
          textStyle,
        ]}>
        {text ? text : 'Back'}
      </RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    // transform: [{rotate: '180deg'}],
    // width: spacing.WIDTH_18,
    // height: spacing.WIDTH_18,
  },
  text: {
    fontSize: textScale(13),
    marginLeft: spacing.MARGIN_6,
  },
});

export default BackButton;
