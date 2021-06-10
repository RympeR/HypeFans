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
    { username: '@tonybellew', avatar: require('../../assets/images/ava2.jpg'), first_name: 'Tony Bellew', background_photo: require('../../assets/images/photo1.png') },
    { username: '@desiree', avatar: require('../../assets/images/ava3.png'), first_name: 'Desi', background_photo: require('../../assets/images/photo2.png') },
    { username: '@rebecca_aviatrix', avatar: require('../../assets/images/ava4.png'), first_name: 'Rebecca_aviatrix', background_photo: require('../../assets/images/photo3.png') },
    { username: '@tiffany', avatar: require('../../assets/images/ava6.png'), first_name: 'Tiffany 🍸', background_photo: require('../../assets/images/phototf.png') },
    { username: '@rubydaycooking', avatar: require('../../assets/images/ava5a.png'), first_name: 'Ruby Day Cooking', background_photo: require('../../assets/images/photord.png') },
    { username: '@djdeelz', avatar: require('../../assets/images/ava7.png'), first_name: 'DjDeelz', background_photo: require('../../assets/images/photo7.png') },
    { username: '@officialdanimal', avatar: require('../../assets/images/ava8.png'), first_name: 'DANIMAL', background_photo: require('../../assets/images/photo4.png') },
    { username: '@rampage_jackson', avatar: require('../../assets/images/ava9.png'), first_name: 'Rampage Jackson', background_photo: require('../../assets/images/photo5.png') },
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
