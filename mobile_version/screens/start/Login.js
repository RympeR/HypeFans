import React, { useState, useEffect } from 'react';
import Profile from '../../components/api/user/profile/ApiProfile';

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
  Alert,
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

  let [secure, toogleVisible] = React.useState(true);
  let [incorrectLogin, setIncorrectLogin] = React.useState(false);
  let [incorrectPassword, setIncorrectPassword] = React.useState(false);
  let [pass, setPass] = React.useState('')
  let [login, setLogin] = React.useState('')

  const profile = new Profile();

  // console.log(props);
  const loginMe = () => {
    // console.log("loginMe");


    if (!incorrectPassword || !incorrectLogin) {
      profile.login(login, pass).then(() => {
        Alert.alert("Авторизация", "Авторизация прошла успешно!");
        props.onMainScreen();

      }).catch((error) => {
        console.log(error);

        Alert.alert("Ошибка", "Неверная комбинация  логина и пароля!");
        setIncorrectLogin(true);
        setIncorrectPassword(true);
      
      } 
      ) 
    }else{
      Alert("Ошибка", "Некорректный логин или пароль!");
    }
  }

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].enter}</Text>

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
          { borderColor: incorrectLogin ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              //autoFocus={true}
              keyboardType={'email-address'}
              secureTextEntry={secure}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrectLogin ? s.textRed : s.textBlack]}
              placeholder={text[lang].emailDescr}
              placeholderTextColor={'#aaa'}
              onChangeText={setLogin}
              value={login}
              onEndEditing={()=>setIncorrectLogin(!profile.validateLogin(login)) }

            //onFocus={() => setFocus(true)}
            //onBlur={() => setFocus(false)}
            />
          </View>
          {incorrectLogin
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].email}</Text>
            : null
          }


          <Text style={[s.text14, s.factor, s.mt25, s.textBlack, s.mh15]}>{text[lang].pass}</Text>
          <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrectPassword ? '#f52424' : '#aaa' }
          ]}>
            <TextInput
              //autoFocus={true}
              //keyboardType={'phone-pad'}
              secureTextEntry={secure}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
              incorrectPassword ? s.textRed : s.textBlack]}
              placeholder={text[lang].passDescr}
              placeholderTextColor={'#aaa'}
              onChangeText={setPass}
              value={pass}
              //onFocus={() => setFocus(true)}
              //onBlur={() => setFocus(false)}
              onEndEditing={()=>setIncorrectPassword(!profile.validatePassword(pass)) }
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
          {incorrectPassword
            ? <Text style={[s.text14, s.factor, s.mt5, s.textRed, s.mh15]}>{text[lang].wrongPass}</Text>
            : null
          }

          <TouchableOpacity style={[s.h25, s.mh15, s.jCenter]}
            activeOpacity={0.9}
          //onPress={() => props.onSkip()}
          >
            <Text style={[s.text12, s.factor, s.textOrange, s.textRight]}>{text[lang].forgetPass}</Text>
          </TouchableOpacity>

          <Text style={[s.text14, s.factor, s.mt15, s.textCenter, s.textBlack, s.mh15]}>{text[lang].enterTh}</Text>
          <View style={[s.flexRow, s.spaceCenter, s.mt15]}>
            <TouchableOpacity style={[s.image42, s.center, s.mr20]}
              activeOpacity={0.9}
            //onPress={() => props.onSkip()}
            >
              <Image
                style={[s.image42]}
                source={require('../../assets/images/googleBtn.png')}
              />
              {/* <SvgUri width="42" height="42"
                source={require('../../assets/images/google.svg')} /> */}
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
                onPress={() => loginMe()}
              >
                <Text style={[s.text18, s.factorBold]}>{text[lang].enterBtn}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={[s.disableBtn, s.center, s.mt40]}
                activeOpacity={0.9}
              //onPress={() => props.onSkip()}
              >
                <Text style={[s.text18, s.factorBold, s.textGrey]}>{text[lang].enterBtn}</Text>
              </TouchableOpacity>
          }

          <TouchableOpacity style={[s.h46, s.center, s.mt10, s.ip10mb]}
            activeOpacity={0.9}
            onPress={() => props.onRegister()}
          >
            <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].createAcc1}
              <Text style={[s.text18, s.factorBold, s.textOrange]}>{text[lang].createAcc2}</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: 60 }} />

        </ScrollView>
      </KeyboardAvoidingView >


      <BottomGradient />

    </View >
  );
}
