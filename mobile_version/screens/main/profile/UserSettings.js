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


export default function Screen(props) {

  let lang = props.lang

  // Android back
  useEffect(() => {
    const backAction = () => {
      props.onBack()
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
      onPress={() => props.onBack()}
    >
      <View style={[s.blogModal]}>

        <TouchableOpacity style={[s.h40, s.jCenter]}
          activeOpacity={0.8}
          onPress={() => props.onBack()}
        >
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15,]}>{text[lang].copyLink2} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.h40, s.jCenter]}
          activeOpacity={0.8}
          onPress={() => props.onBack()}
        >
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15,]}>{text[lang].blockUser} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.h40, s.jCenter]}
          activeOpacity={0.8}
          onPress={() => props.onBack()}
        >
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15,]}>{text[lang].blockComments} </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity >
  );
}
