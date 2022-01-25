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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].bankCard}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <Text style={[s.text18, s.factor, s.textCenter, s.textGrey, s.mt25, s.mh30]}>{text[lang].oopsCard1}</Text>

      <Text style={[s.text18, s.factorBold, s.textCenter, s.textBlack, s.mt25, s.mh30]}>{text[lang].oopsCard2}</Text>

      <View style={[s.flex1]} />

      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt10, { marginBottom: platform ? 70 : 70 }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CardAdd')}
      >
        <Text style={[s.text18, s.factorBold]}>{text[lang].addCardBtn}</Text>
      </TouchableOpacity>
    </View >
  );
}
