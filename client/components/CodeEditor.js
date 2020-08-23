import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text,  Picker, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView  } from 'react-native-gesture-handler';
const axios = require("axios");


export default class CodeEditor extends Component {

    state={
        soure_code: '',
        language: '',
        input: '',
        loading: false,
        compile_status: '',
        compile_message: '',
        output: '',
        output_message: '',
        output_html: '',
    }
    componentDidMount(){
        this.setState({
            soure_code: this.props.source_code, // from image 
        })
    }

    handleCompile(){
        const  data= {
            code: this.state.soure_code,
            language: this.state.language
        }
        axios.post("http://35.226.38.50/api/code/compile", {data: data})
            .then(response => {
                this.setState({
                    compile_status: response.compile_status,
                    compile_message: response.message
                })                
            })
            .catch(err =>{
                this.setState({loading: false})                
            });
    }

    handleRun(){
        this.setState({loading: true});
        const  data= {
            code: this.state.soure_code,
            language: this.state.language,
            input: ""
        }
        axios.post("http://35.226.38.50/api/code/run", {data: data} )
            .then(response => {
                this.setState({
                    loading: false,
                    compile_status: response.compile_status,
                    output: response.output,
                    output_message: response.message,
                    output_html: response.output_html,
                })                
            })
            .catch(err =>{
                this.setState({loading: false})                
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loading &&
                    <View style={{alignSelf: "center", marginTop: 32}}>
                        <ActivityIndicator size="large"></ActivityIndicator>
                    </View>
                }
                    {
                        this.state.compile_message.length>0 && 
                        <View >
                            <Text style={styles.headText}>Compile Status</Text>
                            <Text>Message: {this.state.compile_message}</Text>
                            <Text>Status: {this.state.compile_status}</Text>
                        </View>
                    }
                    {
                        this.state.output_message.length>0 && 
                        <View >
                            <Text style={styles.headText}>Output</Text>
                            <Text>Message: {this.state.output_message}</Text>
                            <Text>output: {this.state.output_html}</Text>
                        </View>
                    }

                <ScrollView  showsVerticalScrollIndicator={false}>
                    {/* <Text style={styles.title}>Edit your code</Text> */}
                    <TextInput
                        style={styles.codearea}
                        multiline
                        onChangeText={(source_code) => this.setState({soure_code: source_code})}
                        value={this.state.soure_code}
                        />
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: 150, alignSelf: "center" }}
                        onValueChange={(itemValue, itemIndex) => this.setState({language:itemValue})}
                        >
                    <Picker.Item label="JavaScript" value="JAVASCRIPT_NODE" />
                    <Picker.Item label="Java" value="JAVA8" />
                    <Picker.Item label="C" value="C" />
                    <Picker.Item label="CPP" value="CPP" />
                    <Picker.Item label="C#" value="C#" />
                    <Picker.Item label="Python" value="PYTHON" />
                    <Picker.Item label="Python 3" value="PYTHON3" />
                    <Picker.Item label="PHP" value="PHP" />
                    </Picker>

                    <View style={styles.buttonView} >
                        <TouchableOpacity style={styles.buttonCompile}  onPress={(event)=>{event.preventDefault(); this.handleCompile();}}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>COMPILE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonRun}  onPress={(event)=>{event.preventDefault(); this.handleRun();}}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>RUN IT</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
        );
    }
}
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginTop: 20,
        width: (SCREEN_WIDTH - (20)),
        height: RECIPE_ITEM_HEIGHT + 75,
      },
      title: {
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    codearea: {
        fontSize: 17,
        height: height-200,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: "auto",
        fontWeight: 'bold',
        color: '#229977',
        backgroundColor: '#010212',
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 30,
        marginRight: 5,
        marginLeft: 5,
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
    },
    compileView:{
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        flex: 1,
        marginLeft: 10,
        marginTop: 20,
        height: 30,
        borderColor: '#77DD77',
        borderWidth: 3,
        borderRadius: 5
    },
    outputView:{
        padding: 5,
        paddingBottom: 10,
        paddingTop: 10,
        flex: 1,
        marginLeft: 10,
        marginTop: 20,
        height: 30,
        borderColor: '#77DD77',
        borderWidth: 3,
        borderRadius: 5
    },
    headText:{
        alignSelf: 'center',
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 24,
        color: '#000',
    }
  
  });
  