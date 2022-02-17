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

  let list = props.route.params.list

  let [userList, setUserList] = React.useState(list)

  let _filerList = (txt) => {
    let word = txt.toLowerCase()
    let filteredWord
    if(txt!=''){
      filteredWord = list.filter((user,i) => user.name.toLowerCase().includes(word))
    }else{
      filteredWord = list
    }
    setUserList(filteredWord)
  } 
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
        <Text style={[width < 320 ? s.text20 : s.text24, s.factorBold, s.textBlack]}>{props.route.params.title}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <View style={[]}>
        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter]}>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
          //onPress={() => setSearch(false)}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/search.svg')} />
          </TouchableOpacity>

          <TextInput
            style={[s.text14, s.factor, s.textBlack, s.flex1, s.h46, platform ? s.mt3 : null]}
            placeholder={text[lang].search}
            placeholderTextColor={'#aaa'}
          // onFocus={() => platform ? null : props.setTab(false)}
          // onBlur={() => platform ? null : props.setTab(true)}
          //onEndEditing={() => { setSearch(false) }}
          onChangeText={(txt)=>_filerList(txt)}
          />

        </View>
        <View style={[s.greyLine, s.mh15]}/>
      </View>

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        {
          userList.map((user, index) => (
            <View key={index} style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15, s.mt15]}>
              <TouchableOpacity style={[s.aCenter, s.flexRow, { width: width - 100 }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('UserPage', { user: user })}
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
            </View>
          ))
        }

      </ScrollView>
    </View >
  );
}
