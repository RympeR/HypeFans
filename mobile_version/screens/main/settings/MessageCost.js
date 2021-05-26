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
  let [incorrect, setIncorrect] = React.useState(false)



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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].msgCost}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <Text style={[s.text14, s.factor, s.textGrey, s.mh15, s.mt15]}>{text[lang].msgCostDescr}</Text>

      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
        activeOpacity={0.8}
        onPress={() => setSwitch1(!switch1)}
      >
        <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].free}</Text>
        <View style={[s.mh15]}>
          <Switch
            trackColor={{ false: "#ddd", true: "#FF6644" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setSwitch1(!switch1)}
            value={switch1}
          />
        </View>
      </TouchableOpacity>
      <View style={[s.greyLine, s.mh15]} />

      { switch1
        ?
        <View style={[s.mt15]}>
          <Text style={[s.text14, s.factor, s.textGrey, s.mh15, s.mt15, { color: '#ddd' }]}>{text[lang].dayCost}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.aCenter, { borderColor: '#ddd' }
          ]}>
            <Text style={[s.text14, s.factor, s.textBlack, s.ml15, { color: '#ddd' }]}>{'$ '}</Text>
            <Text style={[s.text14, s.factor, { color: '#ddd' }]}>{text[lang].enterSumm}</Text>
          </View>
        </View>
        :
        <View style={[s.mt15]}>
          <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].dayCost}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect ? '#f52424' : '#aaa' }
          ]}>
            <Text style={[s.text14, s.factor, s.textBlack, s.ml15]}>{'$ '}</Text>
            <TextInput
              keyboardType={'numeric'}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46,
              incorrect ? s.textRed : s.textBlack]}
              placeholder={text[lang].enterSumm}
              placeholderTextColor={'#999'}
            />
          </View>
          {incorrect
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].inputCode}</Text>
            : null
          }
          {
            true
              ?
              <View>
                <Text style={[s.text18, s.factor, s.textGrey, s.textCenter, s.mh30, s.mt15]}>{text[lang].oops}</Text>
                <Text style={[s.text18, s.factorBold, s.textBlack, s.textCenter, s.mh30, s.mt15]}>{text[lang].addCard}</Text>
                <TouchableOpacity style={[s.orangeBtn, s.center, s.mt25]}
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('CardAdd')}
                >
                  <Text style={[s.text18, s.factorBold]}>{text[lang].addCardBtn}</Text>
                </TouchableOpacity>
              </View>
              : null
          }

        </View>
      }





    </View >
  );
}
