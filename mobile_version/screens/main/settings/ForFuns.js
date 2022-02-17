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


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  const [switch1, setSwitch1] = useState(true);
  let [incorrect, setIncorrect] = React.useState(false)



  return (
    <View style={[s.container, s.backColor]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <SvgUri width="16" height="16"
            source={require('../../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].forFun}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
        activeOpacity={0.8}
        onPress={() => setSwitch1(!switch1)}
      >
        <Text style={[s.text18, s.factor, s.textBlack, {width: width-100}]}>{text[lang].forFunSw}</Text>
        <View style={[s.mh15]}>
          <Switch
            trackColor={{ false: "#ddd", true: "#FF6644" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setSwitch1(!switch1)}
            value={switch1}
          />
        </View>
      </TouchableOpacity>

      <Text style={[s.text14, s.factor, s.textGrey, s.textLine21, s.mh15, s.mt15]}>{text[lang].forFunDescr}</Text>

    </View >
  );
}
