import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HeaderClass from '../components/HeaderClass';
import firebase from 'firebase';
import firestore from '../config';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default class RequestScreen extends Component{

  constructor(){
    super();
    this.state = {
      user_id : firebase.auth().currentUser.email,
      bookName : '',
      reasonToRequest : ''
    }
  }

  createUniqueID = () => {
    return(
      Math.random().toString(36).substring(7)
    )
  }

  addRequests = async(bookName, reason) => {
    firestore.collection('request_books').add({
      'user_id' : this.state.user_id,
      'book_name' : bookName,
      'reson_to_request' : reason,
      'request_id' : this.createUniqueID()
    })
    this.setState({
      bookName : '',
      reasonToRequest : ''
    })
    alert('book requested successfully');
  }

  render(){
    return(
      <View>
          <Text> Request Screen </Text>
          <KeyboardAvoidingView>
            <TextInput placeholder = {'Enter book name'} onChangeText = {(text) => {
              this.setState({
                bookName : text
              })
            }}
            value = {this.state.bookName}></TextInput>
            <TextInput placeholder = {'Enter the reason why you want it ?'} onChangeText = {(text) => {
              this.setState({
                reasonToRequest : text
              })
            }}
            value = {this.state.reasonToRequest} multiline = {true}></TextInput>
            <TouchableOpacity onPress = {() => {
              this.addRequests(this.state.bookName, this.state.reasonToRequest);
            }}>
              <Text> Request </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
    )
  }
}