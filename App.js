import React, {Component} from 'react';
import {Text, View} from 'react-native';
import LoginScreen from './screens/Login';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppDrawerNavigator } from './components/AppDrawerNavigator';
import { AppTabNavigator } from './components/AppTabNavigator';

export default class App extends Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}

const SwitchNavigator = createSwitchNavigator({
  LoginScreen : {screen : LoginScreen},
  Drawer : {screen : AppDrawerNavigator},
  BottomTabNavigator : {screen : AppTabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator);
