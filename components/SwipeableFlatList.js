import React, {Component} from 'react';
import {Text, View, Animated, Dimensions} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import firebase from 'firebase';
import firestore from '../config';
import { Icon, ListItem } from 'react-native-elements';

export default class SwipeableFlatList extends Component{

    constructor(props){
        super(props);
        this.state = {
            all_notifications : this.props.all_notifications
        }
    }

    updateMarkAsRead = (notification) => {
        firestore.collection('all_notifications').doc(notification.doc_id).update({
            'notification_status' : 'read'
        })
    } 

    onSwipeValueChange = (swipeData) => {
        var all_notifications = this.state.all_notifications
        const {key, value} = swipeData;
        if(value < -Dimensions.get('window').width){
            const newData = [...all_notifications];
            const prevIndex = all_notifications.findIndex(item => item.key === key);
            this.updateMarkAsRead(all_notifications[prevIndex]);
            newData.splice(prevIndex, 1);
            this.setState({
                all_notifications : newData
            })
        }
    }

    renderItem = (data) => (
        <Animated.View>
            <ListItem 
            leftElement = {
                <Icon name = 'book' type = 'font-awesome' color = 'red'/>
            }
            title = {data.item.book_name}
            subtitle = {data.item.message}
            bottomDivider />
        </Animated.View>
    )

    renderHiddenItem = () => (
        <View style = {{
            alignItems : 'center',
            flex : 1,
            flexDirection : 'row',
            justifyContent : 'space-between',
            paddingLeft : 15
        }}>
            <View style = {{
                alignItems : 'center', 
                justifyContent : 'center'
            }}>

                <Text style = {{color : 'white'}}></Text> 
            </View>

        </View>
    )

    render(){
        return(
            <View>
                <SwipeListView 
                disableRightSwipe
                data = {this.state.all_notifications}
                renderItem = {this.renderItem}
                renderHiddenItem = {this.renderHiddenItem}
                rightOpenValue = {-Dimensions.get('window').width}
                previewRowKey = '{0}'
                previewOpenValue = {-40}
                onSwipeValueChange = {this.onSwipeValueChange()}/>
            </View>
        )
    }
}