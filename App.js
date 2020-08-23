import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPage from './client/components/CameraPage';

import BottomTabNavigator from './client/navigator/BottomTabNavigator';
// import CodeEditer from './client/components/CodeEditor';

export default class App extends React.Component {
  render() {
      return (
        <View style={{ flex: 1 }}>
            {Platform.OS === "ios"}
            <CameraPage />
            <BottomTabNavigator />
        </View>

      );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
