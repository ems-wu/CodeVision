
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
import { Button, Image, View, Text, CameraRoll, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet} from "react-native";
const axios = require("axios");


export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    cameraRollUri: null,
    apiData: '',
    loading: false
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
                        {
                    this.state.loading &&
                    <View style={{alignSelf: "center", marginTop: 32}}>
                        <ActivityIndicator size="large"></ActivityIndicator>
                    </View>
                }

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

        <View style={styles.buttonView} >
          <Text>Process Image </Text>
            <TouchableOpacity style={styles.buttonCompile}  onPress={(event)=>{this.handleWritten();}}>
                <Text style={{ color: "#FFF", fontWeight: "500"}}>WRITTEN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRun}  onPress={(event)=>{this.handlePrinted();}}>
                <Text style={{ color: "#FFF", fontWeight: "500"}}>PRINTED</Text>
            </TouchableOpacity>
        </View>

      </View>
      
    );
  }

  handlePrinted(){
    const url = 'http://35.226.38.50/api/vision/upload/printed';
    const formData = new FormData();
    formData.append('imageData', this.state.image)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.setState({loading: true})                
    
    axios.post(url, formData,config)
    .then(response => {
        this.setState({
            apiData: response.data
        })                
        console.log(response.data);
    })
    .catch(err =>{
        this.setState({loading: false})                
    });
  }
  handleWritten(){
    const url = 'http://35.226.38.50/api/vision/upload/written';
    const formData = new FormData();
    formData.append('imageData', this.state.image)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    this.setState({loading: true})                
    
    axios.post(url, formData,config)
    .then(response => {
        this.setState({
            apiData: response.data
        })                
    })
    .catch(err =>{
        this.setState({loading: false})                
    });
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
    buttonView:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 30,
      marginHorizontal: 20
  },
  buttonCompile:{
      marginHorizontal: 10,
      backgroundColor: "rgba(1,50,50,0.8)",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
  },
  buttonRun:{
      marginHorizontal: 10,
      backgroundColor: "rgba(50,50,199,0.7)",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
  }

});
