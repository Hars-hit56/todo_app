import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import AppStack from './navigations';
import reduxStore from './redux/store';

function App() {
  return (
    <View style={{flex: 1}}>
      <Provider store={reduxStore}>
        <AppStack />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
