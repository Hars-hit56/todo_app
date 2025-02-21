import {
  ColorValue,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../styles/commonStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from '../common/RegularText';

interface TabProps {
  tabData: Record<string, any>[];
  activeTab: string;
  onPressTab: (tab: string) => void;
  mainTabContainerStyle?: any;
  tabActiveColor?: ColorValue;
}
const Tab = ({
  tabData,
  activeTab,
  onPressTab,
  mainTabContainerStyle,
  tabActiveColor,
}: TabProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.tabarContainer, mainTabContainerStyle]}>
      {tabData.map((item, index) => (
        <RenderText
          item={item}
          key={'tabData' + index}
          activeTab={activeTab}
          onPressTab={onPressTab}
          index={index}
          lastIndex={tabData.length}
          tabActiveColor={tabActiveColor}
        />
      ))}
    </ScrollView>
  );
};

interface RenderTextProps {
  index: number;
  item: Record<string, any>;
  onPressTab: (tab: string) => void;
  activeTab: string;
  lastIndex: number;
  tabActiveColor?: ColorValue;
}

const RenderText = ({
  index,
  item,
  onPressTab,
  activeTab,
  lastIndex,
  tabActiveColor,
}: RenderTextProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.renderTextContainer,
        index === 0 && {marginLeft: APP_PADDING_HORIZONTAL},
        index + 1 === lastIndex && {marginRight: APP_PADDING_HORIZONTAL},
        activeTab === item.tabName && {
          backgroundColor: tabActiveColor || colors.selected_tab_color,
          borderColor: tabActiveColor || colors.selected_tab_color,
        },
      ]}
      onPress={() => onPressTab(item.tabName)}>
      <RegularText
        style={[
          styles.renderTextStyle,
          activeTab === item.tabName && {color: colors.white},
        ]}>
        {item.label}
      </RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabarContainer: {
    backgroundColor: colors.white,
    marginVertical: APP_PADDING_HORIZONTAL,
  },
  renderTextContainer: {
    borderWidth: spacing.RADIUS_1,
    borderColor: colors.grey300,
    borderRadius: spacing.RADIUS_4,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_4,
    marginRight: spacing.MARGIN_10,
  },
  renderTextStyle: {
    fontFamily: fontNames.FONT_FAMILY_REGULAR,
  },
});

export default Tab;
