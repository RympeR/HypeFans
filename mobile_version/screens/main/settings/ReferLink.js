import React, { useState, useEffect, useRef } from 'react';
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

  let refUsersData = [
    { nick: '@tonybellew', ava: require('../../../assets/images/ava2.png'), name: 'Tony Bellew', summ: '$5' },
    { nick: '@desiree', ava: require('../../../assets/images/ava3.png'), name: 'Desi', summ: '$14' },
    { nick: '@rebecca_aviatrix', ava: require('../../../assets/images/ava4.png'), name: ' Rebecca_aviatrix', summ: '$16' },
  ]
  let [refUsers, setRefUsers] = useState(refUsersData)

  //--- animations -----------
  let startSize = width * 0.3
  let startSettings = 60
  let bigSize = 1.05
  let animTime = 100

  const fadeAnim = useRef(new Animated.Value(startSize)).current;
  const fadeAnim2 = useRef(new Animated.Value(startSettings)).current;

  // popup anim ---
  let [mess, setMess] = React.useState('')
  const fade = useRef(new Animated.Value(0)).current;

  const popupFade = (message) => {

    setMess(message)

    Animated.timing(fade, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(fade, {
        toValue: 0,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }, 1200)
  };



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
          <Text style={[s.text24, s.factorBold, s.textBlack, s.textCenter]}>{text[lang].refLink}</Text>
        </View>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        <Text style={[s.text14, s.factorBold, s.textBlack, s.textCenter, s.mh30, s.mt30]}>{text[lang].refDescr}</Text>
        <Text style={[s.text14, s.factor, s.textBlack, s.textLine21, s.mh15, s.mt15]}>{text[lang].refDescr2}</Text>

        <TouchableOpacity style={[s.pinkBar, s.aCenter, s.flexRow, s.spaceBtw, s.mt25, s.mh15, s.ph15]}
          activeOpacity={0.8}
          onPress={() => popupFade(text[lang].copied)}
        >
          <Text numberOfLines={1} style={[s.text14, s.factorBold, s.textBlack, { width: width - 120 }]}>{'https://hypefans.com/my/settings/my/settings'}</Text>
          <SvgUri width="30" height="30"
            source={require('../../../assets/images/copy.svg')} />
        </TouchableOpacity>

        <View style={[s.flexRow, s.spaceCenter, s.mt15]}>
          <TouchableOpacity style={[s.image42, s.center, s.mr20]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <SvgUri width="40" height="40"
              source={require('../../../assets/images/fb.svg')} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.image42, s.center, s.mr20]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <SvgUri width="40" height="40"
              source={require('../../../assets/images/tg.svg')} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.image42, s.center]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <SvgUri width="40" height="40"
              source={require('../../../assets/images/vb.svg')} />
          </TouchableOpacity>
        </View>

        <View style={[s.aCenter, s.flexRow, s.spaceBtw, s.mh15, s.mt40, s.mb10]}>
          <Text numberOfLines={1} style={[s.text18, s.factorBold, s.textBlack, { width: width - 120 }]}>{text[lang].urCapt}</Text>
          <TouchableOpacity style={[]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <Text style={[s.text14, s.factor, s.textOrange]}>{text[lang].allRef}</Text>
          </TouchableOpacity>
        </View>

        {
          refUsers.map((user, index) => (
            <View key={index} style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15, s.mt15]}>
              <TouchableOpacity style={[s.aCenter, s.flexRow, { width: width - 200 }]}
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

              <Text style={[s.text18, s.factor, s.textBlack, s.mh15]}>{user.summ}</Text>
            </View>
          ))
        }


      </ScrollView>

      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15, s.mb60]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Count')}
      >
        <Text style={[s.text18, s.factorBold]}>{text[lang].myCount}</Text>
      </TouchableOpacity>

      {/* PopUp */}
      <Animated.View style={[s.popUpWrap, s.pabsolute, s.center, { opacity: fade }]}>
        <View style={[s.popUp, s.center]}>
          <Text style={[s.text14, s.textBlack, s.textCenter, s.factor, s.mh20]}>{mess}</Text>
        </View>
      </Animated.View>

    </View >
  );
}
