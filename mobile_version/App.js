import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import {
  Platform, StatusBar, StyleSheet, View, Text,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';


//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';

import StartScreen from './screens/start/StartScreen';
import MainScreen from './screens/main/MainScreen';
//import Navigator from './screens/Navigator';



import s from './styles/style'


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  let [screen, getScreen] = React.useState(false);//false =  main page; true = regpage/authpage
  let [color, getColor] = React.useState(true)
  let [lang, getLang] = React.useState(1)

  console.log("App.js -> screen "+screen);
  // ------ settings ---------------------------------
  AsyncStorage.getItem('color', (err, result) => {
    switch (result) {
      case 'true': getColor(true)
        break
      case 'false': getColor(false)
        break
      default: getColor(true)
    }
  })
  AsyncStorage.getItem('lang', (err, result) => {
    switch (result) {
      case '0': getLang(0)
        break
      case '1': getLang(1) //rus
        break
      case '2': getLang(2)
        break
      default: getLang(1)
    }
  })
  // --------------------------------------------------
  // componentDidMount & componentDidUpdate:
  React.useEffect(() => {
    // askPerm()
  })

  let askPerm = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // await Permissions.askAsync(Permissions.CAMERA);
  }

  // ----------------------------

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete, getColor)}
      />
    );
  } else {
    return (
      <View style={s.container}>

        {/* status bar margin */}
        {/* <View style={[s.marginStatusBar, {
          //backgroundColor: '#fff'
        }]} /> */}

        {
          screen
            ? <StartScreen
              lang={lang}
              onLangChange={(langId) => {
                AsyncStorage.setItem('lang', String(langId), () => getLang(langId))
              }}
              onMainScreen={() => getScreen(false)}
            />
            :
            <MainScreen
              lang={lang}
              onLangChange={(langId) => {
                AsyncStorage.setItem('lang', String(langId), () => getLang(langId))
              }}
              onExit={() => getScreen(true)}
            />
        }
        <StatusBar hidden={false}
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
          //backgroundColor={'#fff'}
        />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/logo.png'),
      require('./assets/images/home.svg'),
      require('./assets/images/homeN.svg'),
      require('./assets/images/bell.svg'),
      require('./assets/images/bellN.svg'),
      require('./assets/images/plus-circle.svg'),
      require('./assets/images/plus-circleN.svg'),
      require('./assets/images/message-square.svg'),
      require('./assets/images/message-squareN.svg'),
      require('./assets/images/user.svg'),
      require('./assets/images/userN.svg'),

    ]),
    Font.loadAsync({
      'factor_a': require('./assets/fonts/FactorA-Regular.ttf'),
      'factor_a_bold': require('./assets/fonts/FactorA-Bold.ttf'),
      'factor_a_medium': require('./assets/fonts/FactorAMedium-Regular.ttf'),
      'factor_a_light': require('./assets/fonts/FactorALight-Regular.ttf'),
      'monda': require('./assets/fonts/Monda-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}



