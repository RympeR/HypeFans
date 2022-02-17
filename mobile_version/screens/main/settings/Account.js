import React, { useState, useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].account}</Text>

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

        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt25, s.mb15]}>{text[lang].info}</Text>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountNick')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].nick}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountEmail')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].email}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountPhone')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].phone}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />

        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt25, s.mb15]}>{text[lang].secur1}</Text>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountPass')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].pass}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountSessions')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].sessions}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />

        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt25, s.mb15]}>{text[lang].actions}</Text>
        <View style={[s.greyLine, s.mh15]} />

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AccountDelete')}
        >
          <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].dellAcc}</Text>
          <View style={[s.mh15]}>
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/forward.svg')} />
          </View>
        </TouchableOpacity>

        <View style={{height: 60}}/>

      </ScrollView>

    </View >
  );
}
