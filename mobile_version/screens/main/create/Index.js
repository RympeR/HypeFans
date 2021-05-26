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

import Create from './Create'
import Story from './Story'
import Editor from './Editor'


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation


  let [search, setSearch] = React.useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Create">
          {(nprops) => <Create  {...nprops}
            lang={lang}
            onBack={() => props.onBack()}
            setTab={(stat) => props.setTab(stat)}
          //onStory={()=>props.onStory()} nested
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


      </Stack.Navigator>
    </NavigationContainer>
  );
}
