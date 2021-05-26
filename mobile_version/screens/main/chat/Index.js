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

import Chat from './Chat'
import ChatModule from './ChatModule'
import CreateChat from './CreateChat'
import ChatGroup from './ChatGroup'
import Mailing from './Mailing'
import MailingModule from './MailingModule'
import PaidChat from './PaidChat'

import UserPage from '../profile/UserPage'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  let route = props.data && props.data.route || null

  let [search, setSearch] = React.useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = {route || "Chat"}
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Chat">
          {(nprops) => <Chat  {...nprops}
            lang={lang}
            users={props.users}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>
        <Stack.Screen name="ChatModule">
          {(nprops) => <ChatModule  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
            data={props.data}
          />}
        </Stack.Screen>
        <Stack.Screen name="CreateChat">
          {(nprops) => <CreateChat  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="ChatGroup">
          {(nprops) => <ChatGroup  {...nprops}
            lang={lang}
            users={props.users}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>

        <Stack.Screen name="Mailing">
          {(nprops) => <Mailing  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="MailingModule">
          {(nprops) => <MailingModule  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
            users={props.users}
            user={props.users[2]}
          />}
        </Stack.Screen>

        <Stack.Screen name="PaidChat">
          {(nprops) => <PaidChat  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="UserPage">
          {(nprops) => <UserPage  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
