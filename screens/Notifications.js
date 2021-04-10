import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import firestore from '../config';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class Notifications extends Component{

    state = {
        all_notifications : []
    }

    componentDidMount = () => {
        firestore.collection('all_notifications').onSnapshot((snapshot) => {
            var all_notifications = snapshot.docs.map((doc) => doc.data());
            this.setState({
                all_notifications : all_notifications
            })
        })
    }

    renderItem = ({item}) => (
        <ListItem
        title = {item.book_name}
        subtitle = {item.message}
        rightElement = {
            <Text> {item.notification_status} </Text> 
        }></ListItem>
    )

    render(){
        return(
            <View>
                  
                <FlatList data = {
                    this.state.all_notifications
                } renderItem = {this.renderItem}></FlatList>
            </View>
        )
    }
}