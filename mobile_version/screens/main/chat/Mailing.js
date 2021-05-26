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
import { LinearGradient } from 'expo-linear-gradient';


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let users = props.users

  let [check1, setCheck1] = useState(false)
  let [check2, setCheck2] = useState(false)
  let [check3, setCheck3] = useState(false)
  let [check4, setCheck4] = useState(false)

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
        <View style={[s.mt15, check1 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => setCheck1(!check1)}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].friends}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{friends.length + ''}</Text>
              </View>
              {
                check1
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>

        {/* newSubscribers  subs*/}
        <View style={[check2 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => setCheck2(!check2)}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].newSubscribers}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{subs.length + ''}</Text>
              </View>
              {
                check2
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>

        {/* scecial spec*/}
        <View style={[check3 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => setCheck3(!check3)}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].scecial}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{spec.length + ''}</Text>
              </View>
              {
                check3
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>


        {/* donuters */}
        <View style={[check4 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => setCheck4(!check4)}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[lang].donuters}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt8]}>{donuters.length + ''}</Text>
              </View>
              {
                check4
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>


      </ScrollView>
    </View >
  );
}
