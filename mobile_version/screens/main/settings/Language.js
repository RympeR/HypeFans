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

  const [switch1, setSwitch1] = useState(true);

    // Android back
    useEffect(() => {
      const backAction = () => {
        navigation.goBack()
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, []);


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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].lang}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
        activeOpacity={0.8}
        onPress={() => props.onLangChange(0)}
      >
        <Text style={[s.text18, s.textBlack, lang == 0 ? s.factorBold : s.factor ]}>
          {text[0].language}</Text>
        <View style={[s.mh10]}>
          {
            lang == 0
              ?
              <SvgUri width="30" height="30"
                source={require('../../../assets/images/check.svg')} />
              : null
          }

        </View>
      </TouchableOpacity>
      <View style={[s.greyLine, s.mh15]} />

      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
        activeOpacity={0.8}
        onPress={() => props.onLangChange(1)}
      >
        <Text style={[s.text18, s.textBlack, lang == 1 ? s.factorBold : s.factor ]}>
          {text[1].language}</Text>
        <View style={[s.mh10]}>
          {
            lang == 1
              ?
              <SvgUri width="30" height="30"
                source={require('../../../assets/images/check.svg')} />
              : null
          }

        </View>
      </TouchableOpacity>
      <View style={[s.greyLine, s.mh15]} />

      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
        activeOpacity={0.8}
        onPress={() => props.onLangChange(2)}
      >
        <Text style={[s.text18, s.textBlack, lang == 2 ? s.factorBold : s.factor ]}>
          {text[2].language}</Text>
        <View style={[s.mh10]}>
          {
            lang == 2
              ?
              <SvgUri width="30" height="30"
                source={require('../../../assets/images/check.svg')} />
              : null
          }

        </View>
      </TouchableOpacity>
      <View style={[s.greyLine, s.mh15]} />


    </View >
  );
}
