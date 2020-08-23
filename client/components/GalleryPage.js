
// import styles from './cameraStyles';

// // renders scrollable gallery of images
// export default ({captures=[]}) => (
//     <ScrollView 
//         horizontal={true}
//         style={[styles.bottomToolbar, styles.galleryContainer]} 
//     >
//         {captures.map(({ uri }) => (
//             <View style={styles.galleryImageContainer} key={uri}>
//                 <Image source={{ uri }} style={styles.galleryImage} />
//             </View>
//         ))}
//     </ScrollView>
// );

import * as React from 'react';
import { Button, Image, View, Text, CameraRoll } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
import ImageView from "react-native-image-viewing";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    cameraRollUri: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        {/* <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        <TouchableOpacity
            style={styles.button}
            onPress={this._pickImage} 
            >         
            <Text style={styles.buttonText}>Select Images</Text>
        </TouchableOpacity>
        <View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
      </View>
      
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        multiple: true
    });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 50,
    },
    imageViewerContainer: {
        //backgroundColor: Colors.lighter,
        height: '100%',
        marginTop: 50,
        padding: 5,
    },
    imageContainer: {
        height: '90%',
    },
    image: {
        margin: 5,
        width: '50%',
        height: 150,
    },
    button: {
        width: 180,
        height: 60,
        backgroundColor: "#585858",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
    },
});
