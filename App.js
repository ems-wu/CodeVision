import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPage from './client/components/CameraPage';
import Toolbar from './client/components/toolbar';

//const Stack = createStackNavigator();
export default function App() {
  return (
    <React.Fragment>
      <View>
        <CameraPage
          style={styles.preview}
          ref={camera => this.camera = camera}
          />
      </View>
      <Toolbar />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
