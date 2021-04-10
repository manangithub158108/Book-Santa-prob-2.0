import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import HeaderClass from '../components/HeaderClass';
import firebase from 'firebase'
import db from '../config';
import { ListItem } from 'react-native-elements';

export default class DonateScreen extends Component{

  constructor(){
    super();
    this.state = {
      user_id : firebase.auth().currentUser.email,
      requestedBooksList : []
    }

    this.requestRef = null
  }

  get_requestedBookList = () => {
    this.requestRef = db.collection('request_books').onSnapshot((snapshot) => {
      var requestedBooksList = snapshot.docs.map((doc) => doc.data());
      
      this.setState({
        requestedBooksList : requestedBooksList
      })
    })
  }

  componentDidMount = () => {
    this.get_requestedBookList();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, i}) => {
    return(
        <ListItem 
        key = {i}
        title = {item.book_name}
        subtitle = {item.reason_to_request}

        rightElement = {<TouchableOpacity onPress = {() => {
          this.props.navigation.navigate('recieverDetails', {'details' : item});
        }}>
          <Text> View </Text>
        </TouchableOpacity>}
        bottomDivider
        />
    )
  }

  render(){
    console.log(this.state.requestedBooksList);
    return(
      <View>
          <Text> DonateScreen </Text>
          <View>
            {this.state.requestedBooksList.length === 0
            ?(<View>
              <Text> list of all requested books </Text>
            </View>)
            :(
              <FlatList data = {this.state.requestedBooksList} 
              renderItem = {this.renderItem} 
              keyExtractor = {this.keyExtractor}/>
            )
            }
          </View>
      </View>
    )
  }
}