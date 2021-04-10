import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Header } from "react-native-elements";

const HeaderClass = (props) => {
    return(
      <Header
      centerComponent = {{
          text : props.title,
            style: {color : 'red', fontSize : 30}
        }}/>
    )
}