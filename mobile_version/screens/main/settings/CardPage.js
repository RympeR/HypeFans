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
import { LinearGradient } from 'expo-linear-gradient';


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

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        <LinearGradient
          style={[s.card, s.mh15, s.mt15]}
          colors={['#8391C6', '#272E4F']}
          start={[0, 0]} end={[0.5, 1]}
        >
          <View style={[s.flexRow, s.mh20, s.mt15]}>
            <View style={[s.flex1]} />
            <SvgUri width="38" height="23"
              source={require('../../../assets/images/VISA.svg')} />
          </View>

          <View style={[s.flex1, s.center]}>
            <Text style={[s.text14, s.monda, s.textOrange]}>{'4441 3543 1289 6221'} </Text>
            <Text style={[s.text14, s.monda, s.mt10]}>{'Nikki Rose'} </Text>
          </View>

          <View style={[s.flexRow, s.mh20, s.mb15]}>
            <View style={[s.flex1]} />
            <Text style={[s.text14, s.monda, s.mt10]}>{'10/23'} </Text>
          </View>

        </LinearGradient>
        <View style={[s.flexRow, s.mb5,]}>
          <View style={[s.flex1]} />
          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
          //onPress={() => props.navigation.goBack()}
          >
            <Text style={[s.text14, s.factor, s.textOrange, s.mh15]}>{text[lang].deleteBtn} </Text>
          </TouchableOpacity>
        </View>

        <Text style={[s.text18, s.factorBold, s.textCenter, s.textBlack, s.mt25, s.mh30]}>{text[lang].closestPay}</Text>

        <Text style={[s.text14, s.factor, s.textCenter, s.textGrey, s.mt25, s.mh30]}>{text[lang].payDescr}</Text>

        <View style={[s.flex1]} />

      </ScrollView>

      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt10, { marginBottom: platform ? 70 : 70 }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Count')}
      >
        <Text style={[s.text18, s.factorBold]}>{text[lang].count}</Text>
      </TouchableOpacity>

    </View >
  );
}
