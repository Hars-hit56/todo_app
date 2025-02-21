import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../NavigationService';
import * as Utils from '../utility';
import AppNavigator from './appNavigation';
import {retrieveItem} from '../utility/customAsyncStorage';
import {KEY_TODOS_DATA} from '../utility/constants';
import {addTodo} from '../redux/slices/todoSlice';

const Stack = createStackNavigator();

const AppStack = () => {
  const dispatch = useDispatch();

  const {todosData} = useSelector(
    (state: any) => ({
      todosData: state.TODO_SLICE.todosData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    getAsyncStorageData();
  }, []);

  async function getAsyncStorageData() {
    try {
      const todoData = await retrieveItem(KEY_TODOS_DATA);
      if (todoData && !todosData.length)
        dispatch(addTodo({allTodosData: todoData}));
    } catch (err) {}
  }

  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          // initialRouteName={Utils.Constants.KEY_APP_NAVIGATOR}
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          <Stack.Screen
            name={Utils.Constants.KEY_APP_NAVIGATOR}
            component={AppNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
