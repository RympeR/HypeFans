import React, { useState, useEffect, useContext } from 'react';
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

import Profile from './Profile'
import ProfileEdit from './ProfileEdit'
import UserPage from './UserPage'


import Settings from '../settings/Settings'
import Language from '../settings/Language'
import ReferLink from '../settings/ReferLink'

import List from '../settings/List'
import ListUsers from '../settings/ListUsers'

import Stat from '../settings/Stat'
import Count from '../settings/Count'
import CountSpend from '../settings/CountSpend'

import SubscribeCost from '../settings/SubscribeCost'
import MessageCost from '../settings/MessageCost'
import ForFuns from '../settings/ForFuns'

import Account from '../settings/Account'
import AccountNick from '../settings/AccountNick'
import AccountEmail from '../settings/AccountEmail'
import AccountPhone from '../settings/AccountPhone'
import AccountPass from '../settings/AccountPass'
import AccountSessions from '../settings/AccountSessions'
import AccountDelete from '../settings/AccountDelete'

import Security from '../settings/Security'
import SecurityBlocked from '../settings/SecurityBlocked'

import NoteSettings from '../settings/NoteSettings'
import NoteSettingsPush from '../settings/NoteSettingsPush'
import NoteSettingsEmail from '../settings/NoteSettingsEmail'
import NoteSettingsSite from '../settings/NoteSettingsSite'

import CardCheck from '../settings/CardCheck'
import CardPage from '../settings/CardPage'
import CardAdd from '../settings/CardAdd'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ApiProfileContext from '../../../apiProfileContext';



//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  let route = props.data && props.data.route || null
  let [search, setSearch] = React.useState(false)
  const apiProfile = useContext(ApiProfileContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName = {route || "Profile"}
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="Profile">
          {(nprops) => <Profile  {...nprops}
            lang={lang}
            onExit={() => props.onExit()}
          />}
        </Stack.Screen>
        <Stack.Screen name="ProfileEdit">
          {(nprops) => <ProfileEdit  {...nprops}
            apiProfile={apiProfile}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>

        <Stack.Screen name="UserPage">
          {(nprops) => <UserPage  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>


        <Stack.Screen name="Settings">
          {(nprops) => <Settings  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="SubscribeCost">
          {(nprops) => <SubscribeCost  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="MessageCost">
          {(nprops) => <MessageCost  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="ForFuns">
          {(nprops) => <ForFuns  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="Account">
          {(nprops) => <Account  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountNick">
          {(nprops) => <AccountNick  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountEmail">
          {(nprops) => <AccountEmail  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountPhone">
          {(nprops) => <AccountPhone  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountPass">
          {(nprops) => <AccountPass  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountSessions">
          {(nprops) => <AccountSessions  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="AccountDelete">
          {(nprops) => <AccountDelete  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="Security">
          {(nprops) => <Security  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="SecurityBlocked">
          {(nprops) => <SecurityBlocked  {...nprops}
            lang={lang}
            users={props.users}
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

        <Stack.Screen name="Language">
          {(nprops) => <Language  {...nprops}
            lang={lang}
            onLangChange={(langId) => { props.onLangChange(langId) }}
          />}
        </Stack.Screen>

        <Stack.Screen name="ReferLink">
          {(nprops) => <ReferLink  {...nprops}
            lang={lang}
            onLangChange={(langId) => { props.onLangChange(langId) }}
            users={props.users}
          />}
        </Stack.Screen>

        <Stack.Screen name="List">
          {(nprops) => <List  {...nprops}
            lang={lang}

            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="ListUsers">
          {(nprops) => <ListUsers  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>

        <Stack.Screen name="Stat">
          {(nprops) => <Stat  {...nprops}
            lang={lang}
          />}
        </Stack.Screen>
        <Stack.Screen name="Count">
          {(nprops) => <Count  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="CountSpend">
          {(nprops) => <CountSpend  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>

        <Stack.Screen name="CardCheck">
          {(nprops) => <CardCheck  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="CardAdd">
          {(nprops) => <CardAdd  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>
        <Stack.Screen name="CardPage">
          {(nprops) => <CardPage  {...nprops}
            lang={lang}
            users={props.users}
          />}
        </Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
