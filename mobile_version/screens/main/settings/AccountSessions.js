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

  let sessions = [
    { device: 'MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE ', place: '188.130.176.46 - Ukraine', time: ' 3/23/21 10:42 ' },
    { device: 'MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE ', place: '188.130.176.46 - Ukraine', time: ' 3/23/21 15:42 ' },
    { device: 'MIUI Browser 12.9, Android 9, Xiaomi MI 9 SE ', place: '188.130.176.46 - Ukraine', time: ' 3/23/21 20:42 ' },
  ]

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].sessions}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>
        {
          sessions.map((session, index) => (
            <TouchableOpacity key={index} style={[s.mt25, s.mh15]}
              activeOpacity={0.9}
            //onPress={() => navigation.goBack()}
            >
              <Text style={[s.text14, s.factorBold, s.textBlack]}>{session.device}</Text>
              <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
                <View style={[{width: width-120}]}>
                  <Text style={[s.text14, s.factor, s.textGrey2]}>{session.place}</Text>
                </View>
                <Text style={[s.text12, s.factor, s.textGrey2]}>{session.time}</Text>
              </View>
              { index != sessions.length - 1 ? <View style={[s.greyLine, s.mt10]} /> : null}
            </TouchableOpacity>
          ))
        }

      </ScrollView>
    </View >
  );
}
