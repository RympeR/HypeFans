import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  let user = props.route.params.user

  let [buttons, setButtons] = React.useState(false)


  return (
    <View style={[s.container, s.backColor]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>


        <View style={[s.flexRow, s.aCenter]}>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <SvgUri width="20" height="20"
              source={require('../../../assets/images/back.svg')} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.image50r, s.center, s.mr10]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('UserPage', { user: user })}
          >
            <Image
              style={[s.image50r]}
              source={user.ava}
            />
          </TouchableOpacity>
          <View style={[]}>
            <Text style={[s.text18, s.factorBold, s.textBlack]}>{user.name}</Text>
            <Text style={[s.text18, s.factor, s.textGrey]}>{user.nick}</Text>
          </View>
          {/* <View style={[s.flex1]}/> */}
        </View>



        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.7}
        //onPress={() => this.setState({ chatSettings: true })}
        >
          {/* <SvgUri width="20" height="20"
            source={require('../../../assets/images/3dots.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.flex1]} />

      <Text style={[s.text18, s.factorBold, s.textCenter, s.textBlack, s.mh30]}>{text[lang].chatPay}</Text>
      <Text style={[s.text18, s.factor, s.textCenter, s.textGrey, s.mt25, s.mh30]}>
        {text[lang].chatPay2 + user.nick} <Text>{text[lang].chatPay3}</Text>
      </Text>

      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt25]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('ChatModule', { user: user })}
      >
        <Text style={[s.text18, s.factorBold]}>{text[lang].chatPayBtn + '$2'}</Text>
      </TouchableOpacity>

      <View style={[s.flex1]} />

    </View >
  );
}
