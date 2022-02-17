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

import DeleteModal from './DeleteModal'

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)

  let [deleteModal, setDeleteModal] = React.useState(false)

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].dellAcc}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />


      <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].confirm1}</Text>

      <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
      { borderColor: incorrect ? '#f52424' : '#aaa' }
      ]}>
        <Image
          style={[s.capture, s.ml3]}
          source={require('../../../assets/images/testCapt.jpg')}
        />
        <TextInput
          keyboardType={'email-address'}
          style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
          incorrect ? s.textRed : s.textBlack]}
          placeholder={text[lang].enterCapt}
          placeholderTextColor={'#aaa'}
          //onFocus={() => setFocus(true)}
          //onBlur={() => setFocus(false)}
          onChangeText={(txt) => txt.length > 0 ? setAcceptable(true) : setAcceptable(false)}
        />
      </View>
      {incorrect
        ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].nick}</Text>
        : null
      }

      <Text style={[s.text18, s.factorBold, s.textBlack, s.textCenter, s.mh30, s.mt30]}>{text[lang].delDescr}</Text>

      {/* <View style={[s.flex1]} /> */}

      {
        acceptable
          ?
          <TouchableOpacity style={[s.orangeBtn, s.center, s.mt30, s.mb50]}
            activeOpacity={0.9}
            onPress={() => setDeleteModal(true)} //navigation.goBack()}
          >
            <Text style={[s.text18, s.factorBold]}>{text[lang].delBtn}</Text>
          </TouchableOpacity>
          : null
      }


      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={deleteModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => navigation.goBack()}
      >
        <DeleteModal
          lang={lang}
          navigation={navigation}
        />
      </RnModal>

    </View >
  );
}
