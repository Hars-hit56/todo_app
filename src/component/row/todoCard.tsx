import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import commonStyle, {APP_PADDING_HORIZONTAL} from '../../styles/commonStyles';
import {boxShadowTwo} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import colors from '../../utility/colors';
import {convertDateTime} from '../../utility/commonFunction';
import {Images} from '../../utility/imagePaths';
import Image from '../common/Image';
import RegularText from '../common/RegularText';

type TodoCardProps = {
  todo: Record<string, any>;
  index: number;
  lastIndex: number;
  onPressTodoCard: (todo: Record<string, any>) => void;
  onPressCheckBox: (todo: Record<string, any>) => void;
};

const TodoCard = ({
  todo,
  index,
  lastIndex,
  onPressTodoCard,
  onPressCheckBox,
}: TodoCardProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPressTodoCard(todo)}
      style={[
        styles.mainContainer,
        lastIndex === index + 1 && {marginBottom: spacing.MARGIN_124},
      ]}>
      <TouchableOpacity
        onPress={() => onPressCheckBox(todo)}
        style={[
          styles.checkBoxContainer,
          todo?.payload?.completed && {
            backgroundColor: colors.theme,
            borderColor: colors.theme,
          },
        ]}>
        <Image source={Images.IMG_RIGHT_MARK} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <RegularText
          style={[
            styles.text,
            todo?.payload?.completed && {textDecorationLine: 'line-through'},
          ]}>
          {todo?.payload?.title}
        </RegularText>
        <RegularText style={styles.date}>
          {convertDateTime(todo?.payload?.created_at, 'DD MMM HH:mm A')}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    padding: spacing.MARGIN_16,
    backgroundColor: colors.white,
    marginBottom: spacing.MARGIN_16,
    borderRadius: spacing.RADIUS_10,
    ...boxShadowTwo(colors.grey300),
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_10,
    flex: 1,
  },

  checkBoxContainer: {
    width: spacing.WIDTH_24,
    height: spacing.WIDTH_24,
    borderRadius: spacing.RADIUS_30,
    borderWidth: spacing.RADIUS_2,
    borderColor: colors.grey600,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: fontNames.FONT_FAMILY_MEDIUM,
    fontSize: textScale(13),
  },
  date: {
    fontSize: textScale(10),
    color: colors.grey500,
  },
});

export default TodoCard;
