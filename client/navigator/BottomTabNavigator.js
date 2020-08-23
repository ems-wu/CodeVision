import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import { Ionicons } from '@expo/vector-icons';
import {StyleSheet} from "react-native";
import CameraPage from '../components/CameraPage';
import GalleryPage from '../components/GalleryPage';
import CodeEditor from '../components/CodeEditor';

const BottTab = createMaterialBottomTabNavigator();

export default function BottomTabNav() {
    return (
      <NavigationContainer
          independent={true}>
        <BottTab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size=25 }) => {
              let iconName;
  
              if (route.name === 'Camera') {
                iconName = focused
                  ? 'ios-camera'
                  : 'ios-camera'
              } else if (route.name === 'Gallery') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              } else if (route.name === 'Code Editor') {
                iconName = focused ? 'ios-barcode' : 'ios-barcode';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <BottTab.Screen name="Camera" component={CameraPage} />
          <BottTab.Screen name="Code Editor" component={CodeEditor} />
          <BottTab.Screen name="Gallery" component={GalleryPage} />
        </BottTab.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
tabs: {
    paddingVertical: 10
}
});