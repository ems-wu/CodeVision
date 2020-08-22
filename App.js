import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPage from './client/components/CameraPage';

//const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
      return (
          <CameraPage />
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
