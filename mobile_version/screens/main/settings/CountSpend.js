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
import RnModal from 'react-native-modal';

import RefilModal from './RefilModal'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let [refilModal, setRefilModal] = useState(false)

  let usersData = [
    { nick: '@tonybellew', msg: 'Донат от ', summ: '$5', time: 'Вчера', ava: require('../../../assets/images/ava2.png') },
    { nick: '@rebecca_aviatrix', msg: 'Подписка на 3 меясца от ', summ: '$16', time: 'Март, 20', ava: require('../../../assets/images/ava4.png') },
    { nick: '@desiree', msg: 'Прочтение платного сообщения ', summ: '$14', time: 'Март, 24', ava: require('../../../assets/images/ava3.png') },
    { nick: '@tonybellew', msg: 'Донат от ', summ: '$5', time: 'Вчера', ava: require('../../../assets/images/ava2.png') },
    { nick: '@rebecca_aviatrix', msg: 'Подписка на 3 меясца от ', summ: '$16', time: 'Март, 20', ava: require('../../../assets/images/ava4.png') },
  ]
  let [spendUsers, setEarnUsers] = useState(usersData)

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
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].spend}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.selector, s.flexRow, s.spaceBtw, s.aCenter, s.mh15]}>
        <TouchableOpacity style={[s.h40, s.flex1, s.center]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Count')}
        >
          <Text style={[s.text15, s.factor, s.textBlack]}>{text[lang].earn}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.selectorBtn, s.flex1, s.center]}
          activeOpacity={0.7}
        //onPress={() => navigation.navigate('Story')}
        >
          <Text style={[s.text15, s.factor, s.textBlack]}>{text[lang].spend}</Text>
        </TouchableOpacity>
      </View>

      <View style={[s.balance, s.flexRow, s.spaceBtw, s.aCenter, s.mh15, s.mt15]}>
        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt15, s.mb15]}>{text[lang].balance2}</Text>
        <Text style={[s.text18, s.factor, s.textBlack, s.mh15, s.mt15, s.mb15]}>{'$320'}</Text>
      </View>

      {/* history */}
      <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt15]}>
        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt15, s.mb15]}>{text[lang].history}</Text>
        <View style={[s.flex1]} />
        <TouchableOpacity style={[s.h40, s.center]}
          activeOpacity={0.7}
        //onPress={() => navigation.navigate('')}
        >
          <Text style={[s.text14, s.factor, s.textOrange, s.mh15, s.mt15, s.mb15]}>{text[lang].allRef}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        {
          spendUsers.map((user, index) => (
            <View key={index} style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15, s.mt15]}>
              <TouchableOpacity style={[s.aCenter, s.flexRow, { width: width - 140 }]}
                activeOpacity={0.8}
              //onPress={() => props.onSkip()}
              >
                <Image
                  style={[s.image50r, s.mr10]}
                  source={user.ava}
                />
                <View style={[]}>
                  <Text numberOfLines={2} style={[s.text14, s.factor, s.textGrey, s.mt5]}>
                    {user.msg}<Text style={[s.text14, s.factorBold, s.textBlack]}>{user.nick}</Text>
                  </Text>
                  <Text style={[s.text12, s.factor, s.textGrey, s.mt3]}>{user.time}</Text>
                </View>
              </TouchableOpacity>


              <View style={[s.flex1]} />

              <Text style={[s.text18, s.factor, s.textBlack, s.mh15]}>{user.summ}</Text>
            </View>
          ))
        }

      </ScrollView>

      { // card?
        true
          ?
          <TouchableOpacity style={[s.orangeBtn, s.center, s.mt10, { marginBottom: platform ? 60 : 60 }]}
            activeOpacity={0.9}
            onPress={() => setRefilModal(true)}
          >
            <Text style={[s.text18, s.factorBold]}>{text[lang].refill}</Text>
          </TouchableOpacity>
          : null
      }

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={refilModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setRefilModal(false)}
      >
        <RefilModal
          lang={lang}
          navigation={navigation}
          onBack={()=>setRefilModal(false)}
        />
      </RnModal>
    </View >
  );
}
