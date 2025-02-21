import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Todo from '../component/screen/appScreen/todo';
import * as Utils from '../utility';
import AddTodo from '../component/screen/appScreen/addTodo';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator
        initialRouteName={Utils.Constants.SCREEN_TODO}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={Utils.Constants.SCREEN_TODO} component={Todo} />
        <Stack.Screen
          name={Utils.Constants.SCREEN_ADD_TOTO}
          component={AddTodo}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;
