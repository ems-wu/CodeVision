import React from "react";
import { View, Text } from 'react-native';
import { Camera, Permissions } from 'expo-camera';

import styles from './cameraStyles';

class CameraPage extends React.Component {
    // holds reference to camera component & interacts w/ camera itself
    camera = null; // null = user denied or hasn't granded permissions

    // keeps track of user permission for camera

    state = {
        hasCameraPermision: null,
    };

    // requests permissions from user
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <View>
                <Camera
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                />
            </View>
        );
    };
};

export default CameraPage;