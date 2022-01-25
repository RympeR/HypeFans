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
import { TextInputMask } from 'react-native-masked-text'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)
  let [number, setNumber] = React.useState(null)
  let [date, setDate] = React.useState(null)
  let [cvv, setCvv] = React.useState(null)


  return (
    <View style={[s.container, s.backColor]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Profile')}
        >
          <SvgUri width="16" height="16"
            source={require('../../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].cardAdding}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />


      <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].cardNumber}</Text>

      <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
      { borderColor: incorrect ? '#f52424' : '#aaa' }
      ]}>
        <TextInputMask
          keyboardType={'numeric'}
          type={'credit-card'}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard'
          }}
          style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
          incorrect ? s.textRed : s.textBlack]}
          placeholder={'_ _ _ _   _ _ _ _   _ _ _ _   _ _ _ _'}
          placeholderTextColor={'#aaa'}
          onChangeText={(txt) => setNumber(txt)}
          value={number}
        />
        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.7}
        //onPress={() => navigation.navigate('CardCheck')}
        >
          <SvgUri width="24" height="24"
            source={require('../../../assets/images/scan.svg')} />
        </TouchableOpacity>
      </View>

      <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].name}</Text>
      <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
      { borderColor: incorrect ? '#f52424' : '#aaa' }
      ]}>
        <TextInput
          keyboardType={'default'}
          style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
          incorrect ? s.textRed : s.textBlack]}
          placeholder={text[lang].cardName}
          placeholderTextColor={'#aaa'}
          //onFocus={() => setFocus(true)}
          //onBlur={() => setFocus(false)}
          onChangeText={(txt) => txt.length > 0 ? setAcceptable(true) : setAcceptable(false)}
        />
      </View>

      <View style={[s.flexRow, s.spaceBtw, s.aCenter,]}>
        <View style={[s.flex1]}>
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].term}</Text>
          <View style={[s.halfInputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect ? '#f52424' : '#aaa' }
          ]}>
            <TextInputMask
              type={'datetime'}
              options={{ format: 'MM/YY' }}
              keyboardType={'numeric'}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrect ? s.textRed : s.textBlack]}
              placeholder={'MM / YY'}
              placeholderTextColor={'#aaa'}
              onChangeText={(txt) => setDate(txt)}
              value={date}
            />
          </View>
        </View>
        <View style={[s.flex1]}>
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{'CVV'}</Text>
          <View style={[s.halfInputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              secureTextEntry={true}
              keyboardType={'numeric'}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrect ? s.textRed : s.textBlack]}
              placeholder={'000'}
              placeholderTextColor={'#aaa'}
              onChangeText={(txt) => txt.length < 4 ? setCvv(txt) : null}
              value={cvv}
            />
          </View>


        </View>
      </View>


      <View style={[s.flex1]} />

      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt10, { marginBottom: platform ? 70 : 70 }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CardPage')}
      >
        <Text style={[s.text18, s.factorBold]}>{text[lang].addCardBtn}</Text>
      </TouchableOpacity>
    </View >
  );
}
