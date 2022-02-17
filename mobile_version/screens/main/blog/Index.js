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

import Blog from './Blog'
import UserPage from '../profile/UserPage'
import Story from '../create/Story'
import Editor from '../create/Editor'
import StoryViewer from './StoryViewer'
import Create from '../create/Create'
import ChatModule from '../chat/ChatModule'


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


export default function Screen(props) {

  let lang = props.lang

  let [search, setSearch] = React.useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Stack.Screen name="Blog">
          {(nprops) => <Blog  {...nprops}
            lang={lang}
            onExit={() => props.onExit()}
            users={props.users}
          />}
        </Stack.Screen>

        <Stack.Screen name="UserPage">
          {(nprops) => <UserPage  {...nprops}
            lang={lang}
            users={props.users}
            setTab={(stat) => props.setTab(stat)}
            onPage = {(data) => props.onPage(data)}
          />}
        </Stack.Screen>
        <Stack.Screen name="Story">
          {(nprops) => <Story  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>
        <Stack.Screen name="Editor">
          {(nprops) => <Editor  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
          />}
        </Stack.Screen>
        <Stack.Screen name="Create">
          {(nprops) => <Create  {...nprops}
            lang={lang}
            onBack={() => props.onBack()}
            setTab={(stat) => props.setTab(stat)}
          //onStory={()=>props.onStory()} nested
          />}
        </Stack.Screen>
        <Stack.Screen name="ChatModule">
          {(nprops) => <ChatModule  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
            data={props.data}
          />}
        </Stack.Screen>
        <Stack.Screen name="StoryViewer">
          {(nprops) => <StoryViewer  {...nprops}
            lang={lang}
            setTab={(stat) => props.setTab(stat)}
            data={props.data}
          />}
        </Stack.Screen>



      </Stack.Navigator>
    </NavigationContainer>
  );
}
