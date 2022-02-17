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

import PhoneCode from './PhoneCode'

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';
import { TextInputMask } from 'react-native-masked-text'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)
  let [number, setNumber] = React.useState('')

  let [sentModal, setSentModal] = React.useState(false)

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].phone}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />


      <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].phone}</Text>

      <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
      { borderColor: incorrect ? '#f52424' : '#aaa' }
      ]}>
        <TextInputMask
          type={'cel-phone'}
          options={{
            maskType: 'INTERNATIONAL',
            withDDD: true,
            dddMask: '(99) '
          }}
          keyboardType={'phone-pad'}
          style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
          incorrect ? s.textRed : s.textBlack]}
          placeholder={text[lang].phone}
          placeholderTextColor={'#aaa'}
          onChangeText={(txt) => setNumber(txt)}
          value={number}
        />
        {
          acceptable
            ?
            <View style={[s.mh15]}>
              <SvgUri width="16" height="16"
                source={require('../../../assets/images/check.svg')} />
            </View>
            : null
        }
      </View>
      {incorrect
        ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].nick}</Text>
        : null
      }

      {/* <View style={[s.flex1]} /> */}

      {
        number.length>0
          ?
          <TouchableOpacity style={[s.orangeBtn, s.center, s.mt25, s.mb50]}
            activeOpacity={0.9}
            onPress={() => setSentModal(true)} //navigation.goBack()}
          >
            <Text style={[s.text18, s.factorBold]}>{text[lang].save}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[s.disableBtn, s.center, s.mt25, s.mb50]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <Text style={[s.text18, s.factorBold, s.textGrey]}>{text[lang].save}</Text>
          </TouchableOpacity>
      }


      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={sentModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => navigation.goBack()}
      >
        <PhoneCode
          lang={lang}
          navigation={navigation}
        />
      </RnModal>

    </View >
  );
}
