import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera, Permissions } from 'expo-camera';

import styles from './cameraStyles';
import Toolbar from './toolbar';
import GalleryPage from './GalleryPage';
import BottomTabNavigator from '../navigator/BottomTabNavigator';

class CameraPage extends React.Component {s
    camera = null; // null = user denied or hasn't granded permissions

    // keeps track of user permission for camera
    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    // requests permissions from user
    async componentDidMount() {
        const camera = await Camera.requestPermissionsAsync();
        const hasCameraPermission = (camera.status === 'granted');

        this.setState({ hasCameraPermission });
    };


    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {/* {captures.length > 0 && <GalleryPage captures={captures}/>} */}
                <Toolbar 
                    capturing={capturing} // stores all photos
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onShortCapture={this.handleShortCapture}
                /> 
            </React.Fragment>
        );
    };
};

export default CameraPage;