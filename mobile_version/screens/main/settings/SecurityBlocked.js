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

  let [blackList, setBlackList] = useState(props.users)

  let users = props.users


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

        <View style={[s.center, { width: width - 120 }]}>
          <Text style={[s.text24, s.factorBold, s.textBlack, s.textCenter]}>{text[lang].blockAccounts}</Text>
        </View>

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
          blackList.map((user, index) => (
            <View key={index} style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15, s.mt15]}>
              <TouchableOpacity style={[s.aCenter, s.flexRow, { width: width - 240 }]}
                activeOpacity={0.8}
              //onPress={() => props.onSkip()}
              >
                <Image
                  style={[s.image50r, s.mr10]}
                  source={user.ava}
                />
                <View style={[]}>
                  <Text numberOfLines={1} style={[s.text14, s.factorBold, s.textBlack]}>{user.name}</Text>
                  <Text numberOfLines={1} style={[s.text14, s.factor, s.textGrey, s.mt5]}>{user.nick}</Text>
                </View>
              </TouchableOpacity>


              <View style={[s.flex1]} />

              <TouchableOpacity style={[s.unblockBtn, s.center, s.mh15]}
                activeOpacity={0.8}
                onPress={() => {
                  setBlackList(blackList.filter((user, i) => i != index))
                }}
              >
                <Text style={[s.text14, s.factor, s.textBlack]}>{text[lang].unblock}</Text>
              </TouchableOpacity>
            </View>
          ))
        }

        <View style={{ height: 60 }} />
      </ScrollView>
    </View >
  );
}
