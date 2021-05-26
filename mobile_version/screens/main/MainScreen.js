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
  View,
  Modal,
  KeyboardAvoidingView,
  BackHandler,
  Dimensions,
} from 'react-native';

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';

const { width, height } = Dimensions.get("screen")


import s from '../../styles/style'
import text from '../../assets/text/text'

import Blog from './blog/Index'
import Notifications from './notifications/Index'
import Create from './create/Index'
import Chat from './chat/Index'
import Profile from './profile/Index'


let platform = Platform.OS === 'ios' ? true : false


export default function MainScreen(props) {

  let lang = props.lang

  let users = [
    { nick: '@tonybellew', ava: require('../../assets/images/ava2.jpg'), name: 'Tony Bellew', photo: require('../../assets/images/photo1.png') },
    { nick: '@desiree', ava: require('../../assets/images/ava3.png'), name: 'Desi', photo: require('../../assets/images/photo2.png') },
    { nick: '@rebecca_aviatrix', ava: require('../../assets/images/ava4.png'), name: 'Rebecca_aviatrix', photo: require('../../assets/images/photo3.png') },
    { nick: '@tiffany', ava: require('../../assets/images/ava6.png'), name: 'Tiffany 🍸', photo: require('../../assets/images/phototf.png') },
    { nick: '@rubydaycooking', ava: require('../../assets/images/ava5a.png'), name: 'Ruby Day Cooking', photo: require('../../assets/images/photord.png') },
    { nick: '@djdeelz', ava: require('../../assets/images/ava7.png'), name: 'DjDeelz', photo: require('../../assets/images/photo7.png') },
    { nick: '@officialdanimal', ava: require('../../assets/images/ava8.png'), name: 'DANIMAL', photo: require('../../assets/images/photo4.png') },
    { nick: '@rampage_jackson', ava: require('../../assets/images/ava9.png'), name: 'Rampage Jackson', photo: require('../../assets/images/photo5.png') },
  ]

  let [tab, setTab] = React.useState(true)

  let [active, setActive] = React.useState('Blog')
  let [data, setData] = React.useState(null)

  // Android back
  // useEffect(() => {
  //   const backAction = () => {
  //     // alert
  //     return true;
  //   };
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);


  return (
    <View style={[s.container, s.backColor]} >

      {
        active == 'Blog'
          ?
          <Blog
            lang={lang}
            setTab={(stat) => setTab(stat)}
            users={users}
            onBack={() => setActive('Blog')}
            onPage={(data) => {
              setData(data)
              setActive(data.page)
            }}
          />
          : null
      }
      {/* notifications */}
      {
        active == 'Notifications'
          ?
          <Notifications
            lang={lang}
            setTab={(stat) => setTab(stat)}
            onBack={() => setActive('Blog')}
            users={users}
          />
          : null
      }

      {/* create */}
      {
        active == 'Create'
          ?
          <Create
            lang={lang}
            setTab={(stat) => setTab(stat)}
            onBack={() => setActive('Blog')}
            users={users}
          />
          : null
      }


      {/* chat */}
      {
        active == 'Chat'
          ?
          <Chat
            lang={lang}
            setTab={(stat) => setTab(stat)}
            users={users}
            data = {data}
          />
          : null
      }

      {/* profile */}
      {
        active == 'Profile'
          ?
          <Profile
            lang={lang}
            setTab={(stat) => setTab(stat)}
            users={users}
            onExit={()=>props.onExit()}
            onLangChange={(langId) => { props.onLangChange(langId) }}
            data = {data}
          />
          : null
      }


      {/* -------------------------------- */}

      {
        tab
          ?
          <View style={[s.tabContainer]}>
            <View style={[s.customTabBar, s.flexRow, s.spaceBtw, s.ph15]}>
              <TouchableOpacity style={[s.btn50, s.center]}
                activeOpacity={0.7}
                onPress={() => {
                  setData(null)
                  setActive('Blog')
                }}
              >
                <SvgUri width='20' height='20'
                  source={
                    active == 'Blog'
                      ? require('../../assets/images/home.svg')
                      : require('../../assets/images/homeN.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[s.btn50, s.center]}
                activeOpacity={0.7}
                onPress={() => {
                  setData(null)
                  setActive('Notifications')
                }}
              >
                <SvgUri width='20' height='20'
                  source={
                    active == 'Notifications'
                      ? require('../../assets/images/bell.svg')
                      : require('../../assets/images/bellN.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[s.btn50, s.center]}
                activeOpacity={0.7}
                onPress={() => {
                  setData(null)
                  setActive('Create')
                }}
              >
                <SvgUri width='20' height='20'
                  source={
                    active == 'Create'
                      ? require('../../assets/images/plus-circle.svg')
                      : require('../../assets/images/plus-circleN.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[s.btn50, s.center]}
                activeOpacity={0.7}
                onPress={() => {
                  setData(null)
                  setActive('Chat')
                }}
              >
                <SvgUri width='20' height='20'
                  source={
                    active == 'Chat'
                      ? require('../../assets/images/message-square.svg')
                      : require('../../assets/images/message-squareN.svg')
                  } />
              </TouchableOpacity>
              <TouchableOpacity style={[s.btn50, s.center]}
                activeOpacity={0.7}
                onPress={() => {
                  setData(null)
                  setActive('Profile')
                }}
              >
                <SvgUri width="20" height='20'
                  source={
                    active == 'Profile'
                      ? require('../../assets/images/user.svg')
                      : require('../../assets/images/userN.svg')
                  } />
              </TouchableOpacity>
            </View>

          </View>
          : null
      }

    </View >
  );
}
