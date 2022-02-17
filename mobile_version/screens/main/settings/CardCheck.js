import React, { useState, useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  Dimensions,
  BackHandler
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

import CardEmpty from './CardEmpty'
import CardPage from './CardPage'


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let { cardStatus, setCardStatus } = useState(false)

  return (
    <View style={[s.container]}>

      { // card connected?
        cardStatus
          ?
          <CardPage
            lang={lang}
            navigation={navigation}
          />
          :
          <CardEmpty
            lang={lang}
            navigation={navigation}
          />
      }

    </View >
  );
}
