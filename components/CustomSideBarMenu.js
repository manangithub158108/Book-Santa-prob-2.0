import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {Text, View, Image} from 'react-native';
import { DrawerItems } from "react-navigation-drawer";
import firebase from "firebase";
import { Avatar } from 'react-native-elements';
import firestore from '../config';
import * as ImagePicker from 'expo-image-picker';

export default class CustomSideBarMenu extends Component{

    state = {
        image : '#',
        uid : firebase.auth().currentUser.email,
        name : '',
        docID : ''
    }

    selectPicture = async() => {
        const {cancelled, URI} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [4, 3],
            quality : 1
        })

        if(!cancelled){
            this.uploadImage(URI, this.state.uid);
        }
    }

    uploadImage = async(URI, image_name) => {
        var response = await fetch(URI);
        var blob = await response.blob();
        var ref = firebase.storage().ref().child('user_profiles/' + image_name);
        return ref.put(blob).then((response) => {
                this.fetchImage(image_name)
            })
        
    }


    fetchImage = (image_name) => {
        var ref = firebase.storage().ref().child('user_profiles/' + image_name);
        ref.getDownloadURL().then((URL) => {

            this.setState({
                image : URL
            })
        })

        .catch((error) => {
            this.setState({
                image : '#'
            })
        })
    }

    get_user_profile = () => {
        firestore.collection('users').where('email_id', '==', this.state.uid).onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                const user_data = doc.data();
                this.setState({
                    name : user_data.first_name + user_data.last_name,
                    docID : doc.id,
                    image : doc.data().image
                })
            })
        })
    }

    componentDidMount = () => {
        this.fetchImage(this.state.uid);
        this.get_user_profile();
    }

    render(){
        return(
            <View>
                <View>
                    <Avatar 
                    rounded
                    source = {{uri : this.state.image}} 
                    size = {'medium'}
                    onPress = {() => {
                        this.selectPicture();
                    }}
                    showEditButton/>
                    <Text> {this.state.name} </Text> 
                </View>
                <View>
                    <DrawerItems {...this.props}>

                    </DrawerItems>
                </View>
                <View> 
                    <TouchableOpacity onPress = {() => {
                        this.props.navigation.navigate('LoginScreen');
                        firebase.auth().signOut();
                    }}><Text> Logout </Text></TouchableOpacity>
                </View>
            </View>
        )
    }
}