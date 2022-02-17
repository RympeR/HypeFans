import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("screen")


import s from '../../styles/style'
import text from '../../assets/text/text'

import Register from './Register'
import Login from './Login'


let platform = Platform.OS === 'ios' ? true : false


export default function StartScreen(props) {

  let lang = props.lang

  let [register, setRegister] = React.useState(true)
  let [login, setLogin] = React.useState(false)



  return (
    <View style={[s.container]}>

      { register
        ?
        <Register
          lang={lang}
          onExist={() => {
            setRegister(false)
            setLogin(true)
          }}
          onMainScreen={() => props.onMainScreen()}
        />
        : null
      }

      { login
        ?
        <Login
          lang={lang}
          onRegister={() => {
            setLogin(false)
            setRegister(true)
          }}
          onMainScreen={() => props.onMainScreen()}
        />
        : null
      }



    </View>
  );
}
