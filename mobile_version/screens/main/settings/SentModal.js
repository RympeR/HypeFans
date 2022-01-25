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
      onPress={() => props.navigation.goBack()}
    >
      <View style={[s.exitModal]}>

        <Text style={[s.text18, s.factorBold, s.textBlack, s.textCenter, s.mt15, s.mh15]}>{text[lang].sentDescr} </Text>

        <View style={[s.flexRow, s.mt15, s.mb5, s.center]}>

          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={[s.text16, s.factorBold, s.textBlack, s.mh15]}>{text[lang].clear} </Text>
          </TouchableOpacity>

        </View>
      </View>
    </TouchableOpacity >
  );
}
