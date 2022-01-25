import React, { useState, useEffect } from 'react';
import {
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

import Notifications from './Notifications'
import NoteSettings from '../settings/NoteSettings'
import NoteSettingsPush from '../settings/NoteSettingsPush'
import NoteSettingsEmail from '../settings/NoteSettingsEmail'
import NoteSettingsSite from '../settings/NoteSettingsSite'

import UserPage from '../profile/UserPage'
import ChatModule from '../chat/ChatModule'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Screen(props) {

  let lang = props.lang
  let users = props.users

  let [search, setSearch] = React.useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Notifications">
          {(nprops) => <Notifications  {...nprops}
            lang={lang}
            users={users}
            onBack={() => props.onBack()}
          />}
        </Stack.Screen>
        <Stack.Screen name="NoteSettings">
          {(nprops) => <NoteSettings  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="NoteSettingsPush">
          {(nprops) => <NoteSettingsPush  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="NoteSettingsEmail">
          {(nprops) => <NoteSettingsEmail  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="NoteSettingsSite">
          {(nprops) => <NoteSettingsSite  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="UserPage">
          {(nprops) => <UserPage  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="ChatModule">
          {(nprops) => <ChatModule  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
            data={props.data}
          />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
