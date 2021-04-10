import React, {Component} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';

export const AppTabNavigator = createBottomTabNavigator({
    DonateScreen : {
        screen : DonateScreen,
        navigationOptions : {
            tabBarIcon : <Image source = {require('../assets/request-list.png')}
            style = {{
                width : 20,
                height : 20
            }}/>,
            tabBarLabel : 'Donate Books'
        }
    },
    RequestScreen : {
        screen : RequestScreen,
        navigationOptions : {
            tabBarIcon : <Image source = {require('../assets/request-book.png')}
            style = {{
                width : 20,
                height : 20
            }}/>,
            tabBarLabel : 'Request Books'
        }
    },
})