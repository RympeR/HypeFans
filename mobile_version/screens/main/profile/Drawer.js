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

import RnModal from 'react-native-modal';
import SvgUri from "expo-svg-uri"

import ExitModal from './ExitModal'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  let user = props.user

  let [exitModal, setExitModal] = React.useState(false)

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
    <View style={[s.container, s.flexRow]}>

      <TouchableOpacity style={[s.flex1]}
        activeOpacity={1}
        onPress={() => props.onBack()}
      />

      <View style={[s.drawer]}>
        <View style={[s.drawer, s.flex1, s.statBarMargin]}>
          <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt25]}>{user.name}</Text>
          <Text style={[s.text18, s.factor, s.textGrey2, s.mh15, s.mt5]}>{user.nick}</Text>

          <View style={[s.pinkLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ReferLink')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/link.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].refLink}</Text>
          </TouchableOpacity>
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('List')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/list.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].lists}</Text>
          </TouchableOpacity>
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Stat')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/bar-chart-2.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].stats}</Text>
          </TouchableOpacity>
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Count')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/credit-card.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].balance}</Text>
          </TouchableOpacity>
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Language')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/edit.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].lang}</Text>
          </TouchableOpacity>
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15]}
            activeOpacity={0.8}
            onPress={() => props.onExit()}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/log-in.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].exit}</Text>
          </TouchableOpacity>

          <View style={[s.flex1]} />
          <View style={[s.greyLine]} />

          <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.ml15, s.ip10mb]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings')}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/settings.svg')} />
            <Text style={[s.text14, s.factorBold, s.textBlack, s.ml10]}>{text[lang].settings}</Text>
          </TouchableOpacity>

          <View style={{ height: platform ? 30 : 80 }} />
        </View>

      </View>


      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={exitModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setExitModal(false)}
      >
        <ExitModal
          lang={lang}
          onBack={() => setExitModal(false)}
          onExit={() => props.onExit()}
        />
      </RnModal>
    </View >
  );
}
