import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Image, Modal, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends Component{

    // add a little bitt of signup a change required in signup function 
    
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            firstName : '',
            lastName : '',
            address : '',
            contact : '',
            confirmPassword : '',
            isModalVisible : false
        }
    }

    Signup = (email, password, confirmPassword) => {
        if(password !== confirmPassword){
            return (
                alert('Incorrect Credentials')
            )
        }else{
                firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
                    db.collection('users').add(
                        {
                            'first_name' : this.state.firstName,
                            'last_name' : this.state.lastName,
                            'email_id' : this.state.email,
                            'contact' : this.state.contact,
                            'address' : this.state.address
                        }
                    )
                    return alert('User added Successfully', '', 
                    [
                        {text:'okay', onPress: () => {
                            this.setState({
                                isModalVisible : false
                            })
                        }}
                    ]);
                }).catch(function(error){
                    return alert(error.message);
                })
        }
        
    }

    Login = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            this.props.navigation.navigate('DonateScreen');
        }).catch(function(error){
            return alert(error.message);
        })
    }

    showModal = () => {
        return(

        <Modal 
        visible = {this.state.isModalVisible}
        transparent = {true}>
            <View>
                <KeyboardAvoidingView>

            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                firstName : text
            })
        }} placeholder = 'Enter firstname' 
        style = {style.appHeading}
        ></TextInput>



            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                lastName : text
            })
        }} placeholder = 'Enter lastname' 
        style = {style.appHeading}
        ></TextInput>

            <TextInput 
            onChangeText = {(email) => {
            this.setState({
                email : email
            })
        }} placeholder = 'Enter email' 
        secureTextEntry = {false}
        style = {style.appHeading}
        ></TextInput>


          <TextInput 
            onChangeText = {(password) => {
            this.setState({
                password : password
            })
        }} placeholder = 'Enter password' 
        secureTextEntry = {true}
        style = {style.appHeading}
        ></TextInput>

            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                confirmPassword : text
            })
        }} placeholder = 'Enter confirm Password' 
        secureTextEntry = {true}
        style = {style.appHeading}
        ></TextInput>



            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                address : text
            })
        }} placeholder = 'Enter address' 
        style = {style.appHeading}
            ></TextInput>



            <TextInput 
            onChangeText = {(no) => {
            this.setState({
                contact : no
            })
        }} placeholder = 'Enter contact no.' 
        style = {style.appHeading} 
        keyboardType = 'numeric' 
        maxLength = '10'>
        </TextInput>



        <TouchableOpacity 
        onPress = {() => {
            this.Signup(this.state.email, this.state.password, this.state.confirmPassword);
        }}>
            <Text> Register Button </Text>
        </TouchableOpacity>


        <TouchableOpacity 
        onPress = {() => {
            this.setState({
                isModalVisible : false
            })
        }}>
            <Text> Cancel Button </Text>
        </TouchableOpacity>
        

                </KeyboardAvoidingView>
            </View>
        </Modal>
      );
    }

  render(){
    return(
      <View style = {{backgroundColor : 'lightbue'}}>
          <View>
              {this.showModal()}
          </View>
        <Text style = {style.appHeading}> LoginScreen </Text>
        <Image source = {require('../assets/santa.png')} style = {{
            width : 200,
            height : 200,
            alignSelf : 'center',
            marginTop : 30,
            marginBottom : 30
        }}></Image>
        <View>
        <TextInput 
                onChangeText = {(text) => {
                    this.setState({
                        email : text
                    })
                }} 
                placeholder = 'Enter email' 
                style = {style.appHeading}
                keyboardType = 'email-address'>
            </TextInput>



            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                password : text
            })
        }} 
        placeholder = 'Enter password' 
        secureTextEntry = {true} 
        style = {style.appHeading}/>
        </View>
        <TouchableOpacity onPress = {() => {
            this.Login(this.state.email, this.state.password);
        }}><Text style = {style.button}> Login </Text></TouchableOpacity>
        <TouchableOpacity onPress = {() => {
            this.setState({
                isModalVisible : true
            })
        }}><Text style = {style.button}> Signup </Text></TouchableOpacity>
      </View>
    )
  }
}

var style = StyleSheet.create({
    appHeading : {
        display : 'flex',
        color : '#44c662',
        backgroundColor : '#f23a3a',
        textAlign : 'center',
        justifyContent : 'center',
        width : '100%',
        height : 50,
        fontSize : 40,
        
    },

    TextInput : {
        display : 'flex',
        color : '#ffc300',
        backgroundColor : '#6b0848',
        textAlign : 'center',
        justifyContent : 'center',
        width : '100%',
        height : 50,
        fontSize : 50,
        borderRadius : 40,
        marginTop : 30
    },

    button : {
        display : 'flex',
        color : '#ffc300',
        backgroundColor : '#6b0848',
        textAlign : 'center',
        justifyContent : 'center',
        width : '100%',
        height : 50,
        fontSize : 50,
        borderRadius : 40,
        marginTop : 10
    }
})