import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import firebase from 'firebase';
import db from '../config';
// import { cos } from 'react-native-reanimated';
// import { TouchableOpacity } from 'react-native';

export default class SettingsScreen extends Component{

    constructor(){
        super();
        this.state = {
            email : '',
            first_name : '',
            last_name : '',
            address : '',
            contact : '',
            docID : ''
        }
    }

    update_user_details = () => {
        db.collection('users').doc(this.state.docID).update({
            'first_name' : this.state.first_name,
            'last_name' : this.state.last_name,
            'email_id' : this.state.email,
            'contact' : this.state.contact,
            'address' : this.state.address
        })
        alert('Your profile is updated');
    }

    get_user_details = () => {
        const email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                var data = doc.data();
                this.setState({
                    email : data.email_id,
                    first_name : data.first_name,
                    last_name : data.last_name,
                    address : data.address,
                    contact : data.contact,
                    docID : doc.id
                })
            }) 
        })
    }

    componentDidMount = () => {
        this.get_user_details();
    }

    render(){
        return(
            <View>
                <Text> Settings Screen</Text>
                <View>
                <TextInput 
            onChangeText = {(text) => {
            this.setState({
                first_name : text
            })
        }} placeholder = 'Enter firstname' 
        style = {style.appHeading}
        value = {this.state.first_name}
        ></TextInput>



            <TextInput 
            onChangeText = {(text) => {
            this.setState({
                last_name : text
            })
        }} placeholder = 'Enter lastname' 
        style = {style.appHeading}
        value = {this.state.last_name}
        ></TextInput>

            <TextInput 
            onChangeText = {(email) => {
            this.setState({
                email : email
            })
        }} placeholder = 'Enter email' 
        secureTextEntry = {false}
        style = {style.appHeading}
        value = {this.state.email}
        ></TextInput>

        <TextInput 
            onChangeText = {(text) => {
            this.setState({
                address : text
            })
        }} placeholder = 'Enter address' 
        style = {style.appHeading}
        value = {this.state.address}
            ></TextInput>



            <TextInput 
            onChangeText = {(no) => {
            this.setState({
                contact : no
            })
        }} placeholder = 'Enter contact no.' 
        style = {style.appHeading} 
        keyboardType = 'numeric' 
        maxLength = '10'
        value = {this.state.contact}>
        </TextInput>

        <TouchableOpacity onPress = {() => {
            this.update_user_details();
        }}>
            <Text> Save button</Text>
        </TouchableOpacity>

                </View>
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