import React from 'react';
import {ColorValue, StyleProp, TextStyle} from 'react-native';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from './RegularText';

interface TitleProps {
  title: string;
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  fontFamily?: string;
  color?: ColorValue;
}

const Title = ({title, style, fontSize, fontFamily, color}: TitleProps) => {
  return (
    <RegularText
      style={[
        {
          fontSize: textScale(fontSize || 18),
          fontFamily: fontFamily || fontNames.FONT_FAMILY_BOLD,
          color: color || colors.grey900,
        },
        style,
      ]}>
      {title}
    </RegularText>
  );
};

export default Title;
