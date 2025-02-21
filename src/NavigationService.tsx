import {
  CommonActions,
  DrawerActions,
  StackActions,
} from '@react-navigation/native';
import React from 'react';
import {KEY_APP_NAVIGATOR} from './utility/constants';

let _navigator: any;

export const navigationRef: any = React.createRef();

export function navigate(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.navigate(routeName, params);
}

export function replace(routeName: string, params?: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function back() {
  let canGoBack = navigationRef.current?.canGoBack();
  if (canGoBack) {
    navigationRef.current?.goBack();
  } else {
    clearStack(KEY_APP_NAVIGATOR);
  }
}

export function clearStack(routeName: string, params?: Record<string, any>) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: routeName, params: params}],
  });
  navigationRef.current?.dispatch(resetAction);
}

export function push(routeName: string, params: Record<string, any>) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}

export default {
  back,
  navigate,
  push,
  clearStack,
  replace,
};
