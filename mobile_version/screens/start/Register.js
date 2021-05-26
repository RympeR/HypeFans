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
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../styles/style'
import text from '../../assets/text/text'

import TopGradient from '../../components/TopGradient'
import BottomGradient from '../../components/BottomGradient'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';

export default function Screen(props) {

  let lang = props.lang

  let [secure, toogleVisible] = React.useState(true)
  let [incorrect, setIncorrect] = React.useState(false)
  let [incorrect2, setIncorrect2] = React.useState(false)
  let [incorrect3, setIncorrect3] = React.useState(false)


  return (
    <View style={[s.container]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn56, s.center]}
          activeOpacity={0.8}
          onPress={() => backAction()}
        >
          {/* <SvgUri width="20" height="20"
            source={require('../../../assets/images/back.svg')} /> */}
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].reg}</Text>

        <TouchableOpacity style={[s.btn56, s.center]}
          activeOpacity={0.8}
        //onPress={() => props.onSkip()}
        >
          {/* <SvgUri width="20" height="20"
            source={require('../../../assets/images/exit.svg')} /> */}
        </TouchableOpacity>
      </View>

      <TopGradient />





      <KeyboardAvoidingView style={[]}
        behavior={platform ? "padding" : "height"}
      //behavior={"padding"}
      //keyboardVerticalOffset={20}
      >
        <ScrollView style={[]} showsVerticalScrollIndicator={false}>


          <View style={[s.center, s.mt40]}>
            <Image
              style={[s.logo]}
              source={require('../../assets/images/logo.png')}
            />
          </View>


          <Text style={[s.text14, s.factor, s.mt25, s.textBlack, s.mh15]}>{text[lang].email}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              //autoFocus={true}
              keyboardType={'email-address'}
              secureTextEntry={secure}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrect ? s.textRed : s.textBlack]}
              placeholder={text[lang].emailDescr}
              placeholderTextColor={'#aaa'}
            //onFocus={() => setFocus(true)}
            //onBlur={() => setFocus(false)}
            />
          </View>
          {incorrect
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].email}</Text>
            : null
          }


          <Text style={[s.text14, s.factor, s.mt25, s.textBlack, s.mh15]}>{text[lang].pass}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect2 ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              //autoFocus={true}
              //keyboardType={'phone-pad'}
              secureTextEntry={secure}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrect2 ? s.textRed : s.textBlack]}
              placeholder={text[lang].passDescr}
              placeholderTextColor={'#aaa'}
              //onFocus={() => setFocus(true)}
              //onBlur={() => setFocus(false)}
              //onEndEditing={() => props.onMainScreen()}
            />
            <TouchableOpacity
              style={[s.btn40, s.center, s.mr5]}
              activeOpacity={1}
              onPress={() => toogleVisible(!secure)}
            >
              <SvgUri width="24" height="24"
                source={secure
                  ? require('../../assets/images/show.svg')
                  : require('../../assets/images/showNo.svg')
                } />
            </TouchableOpacity>
          </View>
          {incorrect2
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].passWarn}</Text>
            : null
          }

          <Text style={[s.text14, s.factor, s.mt25, s.textBlack, s.mh15]}>{text[lang].name}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect2 ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              //autoFocus={true}
              keyboardType={'email-address'}
              secureTextEntry={secure}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrect2 ? s.textRed : s.textBlack]}
              placeholder={text[lang].nameDescr}
              placeholderTextColor={'#aaa'}
              //onFocus={() => setFocus(true)}
              //onBlur={() => setFocus(false)}
              onEndEditing={() => props.onMainScreen()}
            />
          </View>
          {incorrect2
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].name}</Text>
            : null
          }

          {/* <BottomGradient /> */}

          <Text style={[s.text14, s.factor, s.mt30, s.textCenter, s.textBlack, s.mh15]}>{text[lang].regThrough}</Text>

          <View style={[s.flexRow, s.spaceCenter, s.mt15]}>
            <TouchableOpacity style={[s.image42, s.center, s.mr20]}
              activeOpacity={0.9}
            //onPress={() => props.onSkip()}
            >
              <Image
                style={[s.image42]}
                source={require('../../assets/images/googleBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[s.image42, s.center, s.mr20]}
              activeOpacity={0.9}
            //onPress={() => props.onSkip()}
            >
              <Image
                style={[s.image42]}
                source={require('../../assets/images/fbBtn.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[s.image42, s.center]}
              activeOpacity={0.9}
            //onPress={() => props.onSkip()}
            >
              <Image
                style={[s.image42]}
                source={require('../../assets/images/instgBtn.png')}
              />
            </TouchableOpacity>
          </View>

          {
            true
              ?
              <TouchableOpacity style={[s.orangeBtn, s.center, s.mt40]}
                activeOpacity={0.9}
                onPress={() => props.onMainScreen()}
              >
                <Text style={[s.text18, s.factorBold]}>{text[lang].regBtn}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[s.disableBtn, s.center, s.mt40]}
                activeOpacity={0.9}
              //onPress={() => props.onSkip()}
              >
                <Text style={[s.text18, s.factorBold, s.textGrey]}>{text[lang].regBtn}</Text>
              </TouchableOpacity>
          }


          <TouchableOpacity style={[s.mh15, s.mt15]}
            activeOpacity={0.8}
          //onPress={() => props.onSkip()}
          >
            <Text style={[s.text12, s.factor, s.textDark, s.textCenter, s.textLine18]}>{text[lang].regLink1}
              <Text style={[s.text12, s.factor, s.textOrange]}>{text[lang].regLink2}</Text>
              <Text style={[s.text12, s.factor, s.textDark]}>{text[lang].regLink3}</Text>
              <Text style={[s.text12, s.factor, s.textOrange]}>{text[lang].regLink4}</Text>
              <Text style={[s.text12, s.factor, s.textDark]}>{text[lang].regLink5}</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.h46, s.center, s.mt20, s.ip10mb]}
            activeOpacity={0.9}
            onPress={() => props.onExist()}
          >
            <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].akkExist1}
              <Text style={[s.text18, s.factorBold, s.textOrange]}>{text[lang].akkExist2}</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: 60 }} />

        </ScrollView>
      </KeyboardAvoidingView >


      <BottomGradient />

    </View >
  );
}
