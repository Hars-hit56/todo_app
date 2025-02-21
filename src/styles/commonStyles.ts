import {StyleSheet} from 'react-native';
import colors from '../utility/colors';
import {spacing} from './spacing';

export const APP_PADDING_HORIZONTAL = spacing.PADDING_16;

const commonStyle = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
});

export default commonStyle;
