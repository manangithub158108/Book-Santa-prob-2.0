import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import {Card, Header} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export default class recieverDetailsScreen extends Component{

    constructor(props){
        super(props);
        this.state = {
            userID : firebase.auth().currentUser.email,
            username : '',
            recieverID : this.props.navigation.getParam('details')['user_id'],
            requestID : this.props.navigation.getParam('details')['request_id'],
            bookName : this.props.navigation.getParam('details')['book_name'],
            reasonToRequest : this.props.navigation.getParam('details')['reason_to_request'],
            recieverName : '',
            recieverContact : '',
            recieverRequestDocID : '',
            recieverAddress : ''
        }
    }

    getRecieverDetails = () => {
        firestore.collection('users').where('email_id', '==', this.state.recieverID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    recieverName : doc.data().first_name,
                    recieverContact : doc.data().contact,
                    recieverAddress : doc.data().address,
                })
            })
        })

        firestore.collection('request_books').where('request_id', '==', this.state.requestID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    recieverRequestDocID : doc.id
                })
            })
        })
    }

    getUserDetails = (userID) => {
        firestore.collection('users').where('email_id', '==', userID).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    username : doc.data().first_name + ' ' + doc.data().last_name
                })
            })
        })
    }

    componentDidMount = () => {
        this.getRecieverDetails();
        this.getUserDetails();
    }

    updateBookStatus = () => {
        firestore.collection('all_donations').add({
            'book_name' : this.state.bookName,
            'request_id' : this.state.requestID,
            'requested_by' : this.state.recieverName,
            'donor_id' : this.state.userID,
            'requested_status' : 'donor interested'
        })
        alert('book status updated')
    }

    addNotification = () => {
        var message = this.state.username + ' has shown interest in donating the book';
        firestore.collection('all_notifications').add({
            reciever_id : this.state.recieverID,
            donor_id : this.state.userID,
            request_id : this.state.requestID,
            book_name : this.state.bookName,
            date : firebase.firestore.FieldValue.serverTimestamp(),
            notification_status : 'unread',
            message : message
        })
    }

    render(){
        return(
            <View>
                <View>
                    <Card 
                    title = {'book info'}
                    >
                        <Card>
                            <Text> name : {this.state.bookName} </Text>
                        </Card>
                        <Card>
                            <Text> reason to request : {this.state.reasonToRequest} </Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    <Card 
                    title = {'reciever info'}
                    >
                        <Card>
                            <Text> name : {this.state.recieverName} </Text>
                        </Card>
                        <Card>
                            <Text> contact : {this.state.recieverContact} </Text>
                        </Card>
                        <Card>
                            <Text> address : {this.state.recieverAddress} </Text>
                        </Card>
                    </Card>
                </View>
                <View>
                    {
                        this.state.recieverID !== this.state.userID
                        ?(<TouchableOpacity onPress = {() => {
                            this.updateBookStatus();
                            this.addNotification();
                            this.props.navigation.navigate('My donations');
                        }}>
                            <Text> I want to donate  </Text>
                        </TouchableOpacity>)
                        :null
                    }
                </View>
            </View>
        )
    }
}