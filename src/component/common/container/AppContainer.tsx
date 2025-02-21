import React from 'react';
import {
  ColorValue,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../../utility/colors';
import commonStyle from '../../../styles/commonStyles';
import {useFocusEffect} from '@react-navigation/native';
import {changeStatusBarColor} from '../../../utility/commonFunction';
// import {globalStyles} from '../../../styles/globalStyles';
// import {colors} from '../../../utility/colors';

type AppContainerProps = {
  statusBarColor?: ColorValue;
  barStyle?: StatusBarStyle;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  backgroundColor?: ColorValue;
};

function AppContainer({
  statusBarColor,
  barStyle,
  style,
  children,
  backgroundColor,
}: AppContainerProps) {
  useFocusEffect(() => {
    changeStatusBarColor(
      statusBarColor || backgroundColor || colors.transparentBlack,
      barStyle || 'dark-content',
    );
  });

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: backgroundColor || colors.theme}}>
        <View
          style={[
            {flex: 1},
            {backgroundColor: backgroundColor || colors.white},
            style,
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

export default AppContainer;
