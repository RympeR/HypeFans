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

  let users = props.users

  let [friends, setFriends] = React.useState(users)
  let [subs, setSubs] = React.useState(users.filter((user, i) => i > 3))
  let [spec, setSpec] = React.useState(users.filter((user, i) => i < 4))
  let [donuters, setDonuters] = React.useState(users.filter((user, i) => i < 5))

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].list}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.pinkLine]} />

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        {/* friends */}
        <TouchableOpacity style={[s.mt25, s.mh15]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ListUsers', {list: friends, title: text[lang].friends})}
        >
          <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
            <View style={[]}>
              <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].friends}</Text>
              <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{friends.length + ''}</Text>
            </View>
            <View style={[s.imageList, s.flexRow]}>
              {
                friends.map((user, index) => (
                  <View key={index} style={[s.image50rb, s.center, s.pabsolute, {
                    left: index * (50 / (friends.length - 1))
                  }]}>
                    <Image
                      style={[s.image48r]}
                      source={user.ava}
                    />
                  </View>
                ))
              }
            </View>
          </View>
          <View style={[s.greyLine, s.mt10]} />
        </TouchableOpacity>

        {/* newSubscribers */}
        <TouchableOpacity style={[s.mt15, s.mh15]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ListUsers', {list: subs, title: text[lang].newSubscribers})}
        >
          <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
            <View style={[]}>
              <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].newSubscribers}</Text>
              <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{subs.length + ''}</Text>
            </View>
            <View style={[s.imageList, s.flexRow]}>
              {
                subs.map((user, index) => (
                  <View key={index} style={[s.image50rb, s.center, s.pabsolute, {
                    left: index * (50 / (subs.length - 1))
                  }]}>
                    <Image
                      style={[s.image48r]}
                      source={user.ava}
                    />
                  </View>
                ))
              }
            </View>
          </View>
          <View style={[s.greyLine, s.mt10]} />
        </TouchableOpacity>

        {/* scecial */}
        <TouchableOpacity style={[s.mt15, s.mh15]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ListUsers', {list: spec, title: text[lang].scecial})}
        >
          <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
            <View style={[]}>
              <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].scecial}</Text>
              <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{spec.length + ''}</Text>
            </View>
            <View style={[s.imageList, s.flexRow]}>
              {
                spec.map((user, index) => (
                  <View key={index} style={[s.image50rb, s.center, s.pabsolute, {
                    left: index * (50 / (spec.length - 1))
                  }]}>
                    <Image
                      style={[s.image48r]}
                      source={user.ava}
                    />
                  </View>
                ))
              }
            </View>
          </View>
          <View style={[s.greyLine, s.mt10]} />
        </TouchableOpacity>


        {/* donuters */}
        <TouchableOpacity style={[s.mt15, s.mh15]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('ListUsers', {list: donuters, title: text[lang].donuters})}
        >
          <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
            <View style={[]}>
              <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].donuters}</Text>
              <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{donuters.length + ''}</Text>
            </View>
            <View style={[s.imageList, s.flexRow]}>
              {
                donuters.map((user, index) => (
                  <View key={index} style={[s.image50rb, s.center, s.pabsolute, {
                    left: index * (50 / (donuters.length - 1))
                  }]}>
                    <Image
                      style={[s.image48r]}
                      source={user.ava}
                    />
                  </View>
                ))
              }
            </View>
          </View>
        </TouchableOpacity>


      </ScrollView>
    </View >
  );
}
