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
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

import TopGradient from '../../../components/TopGradient'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  let users = props.users

  let [buttons, setButtons] = React.useState(false)
  let [filter, setFilter] = React.useState('all') // comments likes subscribs donuts

  let notes = [
    { user: users[0], type: 'likes', msg: '', time: '2 часа назад', term: '', sum: '', img: require('../../../assets/images/thumb1.png') },
    { user: users[1], type: 'comments', msg: 'вау, очень красиво!', time: '5 часов назад', term: '', sum: '', img: require('../../../assets/images/thumb2.png') },
    { user: users[2], type: 'subscribs', msg: '', time: '2 часа назад', term: '3 месяца', sum: '', img: require('../../../assets/images/thumb2.png') },
    //{ user: users[3], type: 'donuts', msg: '', time: '5 часов назад', term: '', sum: '$11', img: require('../../../assets/images/thumb2.png') },
    { user: users[4], type: 'likes', msg: '', time: '2 часа назад', term: '', sum: '', img: require('../../../assets/images/thumb1.png') },
    { user: users[5], type: 'comments', msg: 'вау, очень красиво!', time: '5 часов назад', term: '', sum: '', img: require('../../../assets/images/thumb2.png') },
    { user: users[6], type: 'subscribs', msg: '', time: '2 часа назад', term: '3 месяца', sum: '', img: require('../../../assets/images/thumb2.png') },
  ]
  let [activeNotes, setActiveNotes] = React.useState(notes)

  let _sort = (type) => {
    let arr = notes.filter(note => note.type == type)
    setActiveNotes(arr)
  }


  return (
    <View style={[s.container, s.backColor]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
          onPress={() => props.onBack()}
        >
          <SvgUri width="16" height="16"
            source={require('../../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].notif}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('NoteSettings')}
        >
          <SvgUri width="20" height="20"
            source={require('../../../assets/images/settings.svg')} />
        </TouchableOpacity>
      </View>

      <View style={[s.flexRow, s.mh15, s.mt10]}>
        {
          buttons
            ?
            <View style={[s.buttonsDrawer, s.flexRow]}>
              <TouchableOpacity style={[filter == 'all' ? s.orangeRoundBtn : s.drawerBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => {
                  setButtons(!buttons)
                  setFilter('all')
                  setActiveNotes(notes)
                }}
              >
                <SvgUri width="30" height="30"
                  source={filter == 'all'
                    ? require('../../../assets/images/bellW.svg')
                    : require('../../../assets/images/bellN.svg')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[filter == 'comments' ? s.orangeRoundBtn : s.drawerBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => {
                  setFilter('comments')
                  _sort('comments')
                }}
              >
                <SvgUri width="30" height="30"
                  source={filter == 'comments'
                    ? require('../../../assets/images/message-circleW.svg')
                    : require('../../../assets/images/message-circle.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[filter == 'likes' ? s.orangeRoundBtn : s.drawerBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => {
                  setFilter('likes')
                  _sort('likes')
                }}
              >
                <SvgUri width="30" height="30"
                  source={filter == 'likes'
                    ? require('../../../assets/images/heartW.svg')
                    : require('../../../assets/images/heartB.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[filter == 'subscribs' ? s.orangeRoundBtn : s.drawerBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => {
                  setFilter('subscribs')
                  _sort('subscribs')
                }}
              >
                <SvgUri width="30" height="30"
                  source={filter == 'subscribs'
                    ? require('../../../assets/images/unlockW.svg')
                    : require('../../../assets/images/unlock.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[filter == 'donuts' ? s.orangeRoundBtn : s.drawerBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => {
                  setFilter('donuts')
                  _sort('donuts')
                }}
              >
                <SvgUri width="30" height="30"
                  source={filter == 'donuts'
                    ? require('../../../assets/images/tipW.svg')
                    : require('../../../assets/images/tip.svg')
                  } />
              </TouchableOpacity>
            </View>
            :
            <TouchableOpacity style={[filter == 'all' ? s.orangeRoundBtn : null, s.center]}
              activeOpacity={0.8}
              onPress={() => setButtons(!buttons)}
            >
              <SvgUri width="30" height="30"
                source={filter == 'all'
                  ? require('../../../assets/images/bellW.svg')
                  : require('../../../assets/images/bellW.svg')
                } />
            </TouchableOpacity>
        }
      </View>

      {/* filter = all comments likes subscribs donuts */}
      <Text style={[s.text18, s.factor, s.textGrey2, s.mh15, s.mt20]}>
        {
          (filter == 'all' ? text[lang].all : '') +
          (filter == 'comments' ? text[lang].comments : '') +
          (filter == 'likes' ? text[lang].likes : '') +
          (filter == 'subscribs' ? text[lang].subscribs : '') +
          (filter == 'donuts' ? text[lang].donuts : '')
        }
      </Text>



      <TopGradient />


      <ScrollView style={[]} showsVerticalScrollIndicator={false}>


        {activeNotes.length == 0
          ? <Text style={[s.text18, s.textBlack, s.mh20, s.mt15]}>{text[lang].noComments}</Text>
          : activeNotes.map((note, index) => {
            return (
              <TouchableOpacity key={index} style={[s.noteBar, s.greyBottom, s.flexRow, s.spaceBtw, s.mh15, s.mt15]}
                activeOpacity={1}
                onPress={() => navigation.navigate('UserPage', {user: note.user}) }
              >
                <View style={[s.flexRow]}>
                  <View style={[s.noteUser, s.flexRow, s.Center]}>
                    <Image
                      style={[s.image60r, s.mr10]}
                      source={note.user.ava}
                    />
                    <View style={[{ width: width - 175 }]}>
                      <Text numberOfLines={1} style={[s.text18, s.factorBold, s.textBlack]}>{note.user.name}</Text>
                      <Text numberOfLines={1} style={[s.text18, s.factor, s.textGrey2, s.mt3]}>{note.user.nick}</Text>
                      {
                        note.type == 'likes'
                          ?
                          <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{text[lang].noteLike}</Text>
                          : null
                      }
                      {
                        note.type == 'comments'
                          ?
                          <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{text[lang].noteComment}
                            <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{note.msg}</Text>
                          </Text>
                          : null
                      }
                      {
                        note.type == 'subscribs'
                          ?
                          <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{text[lang].noteSubscribe}</Text>
                          : null
                      }
                      {
                        note.type == 'donuts'
                          ?
                          <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{text[lang].noteDonut}
                            <Text style={[s.text14, s.factor, s.textBlack, s.mt8]}>{note.sum}</Text>
                          </Text>
                          : null
                      }
                      <Text style={[s.text14, s.factor, s.textGrey2, s.mt8, s.mb15]}>{note.time}</Text>
                    </View>
                  </View>
                </View>
                {
                  note.type == 'subscribs'
                    ?
                    <View style={[s.termView, s.center]}>
                      <Text style={[s.text12, s.factor, s.mh10]}>{note.term}</Text>
                    </View>
                    :
                    <View style={[s.noteImg, s.mh5]}>
                      <Image
                        style={[s.noteImg]}
                        source={note.img}
                      />
                    </View>
                }

              </TouchableOpacity>

            )
          })

        }


        <View style={{ height: 60 }} />
      </ScrollView>


    </View >
  );
}
