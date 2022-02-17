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
  View,
  Dimensions,
  BackHandler
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';

export default function Screen(props) {

  let lang = props.lang
  let user = props.user

  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)

  // Android back
  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack()
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <TouchableOpacity style={[s.container, s.center]}
      activeOpacity={1}
    //onPress={() => props.navigation.goBack()}
    >
      <View style={[s.exitModal]}>

        <Text style={[s.text18, s.factorBold, s.textBlack, s.textCenter, s.mt15, s.mh15]}>{text[lang].sendDonut} </Text>

        <View style={[s.flexRow, s.aCenter, s.mh15, s.mt15]}>
          <TouchableOpacity style={[s.image50r, s.center, s.mr10]}
            activeOpacity={0.8}
          //onPress={() => this.state.navigation.navigate('UserPage', { user: user })}
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

        <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
        { borderColor: '#aaa', width: width - 60 }
        ]}>
          <Text style={[s.text14, s.factor, s.textBlack, s.ml15]}>{'$ '}</Text>
          <TextInput
            autoFocus={true}
            keyboardType={'numeric'}
            style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mr15,
            incorrect ? s.textRed : s.textBlack]}
            placeholder={text[lang].enterSumm}
            placeholderTextColor={'#aaa'}
          //onChangeText={(txt) => txt.length > 0 ? setAcceptable(true) : setAcceptable(false)}
          />
        </View>

        <View style={[s.flexRow, s.mt15, s.mb5, s.center]}>
          <View style={[s.flex1]} />
          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
            onPress={() => props.onBack()}
          >
            <Text style={[s.text16, s.factorBold, s.textOrange, s.mh15]}>{text[lang].cancel} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
            onPress={() => props.onBack()}
          >
            <Text style={[s.text16, s.factorBold, s.textBlack, s.mh15]}>{text[lang].send} </Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableOpacity >
  );
}
