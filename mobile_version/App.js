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
import ApiProfile from './components/api/user/profile/ApiProfile.ts';

//import * as ImagePicker from 'expo-image-picker';
//import * as Permissions from 'expo-permissions';

import StartScreen from './screens/start/StartScreen';
import MainScreen from './screens/main/MainScreen';
//import Navigator from './screens/Navigator';



import s from './styles/style'

import ApiProfileContext from './apiProfileContext.tsx';


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // let [screen, setScreen] = React.useState(false);//false =  main page; true = regpage/authpage
  let [color, setColor] = React.useState(true)
  let [lang, setLang] = React.useState(1)

  const [auth, setAuth] = useState(false);// null by default , when get token from storage and get user's profile - set true, if error = false
  const [apiProfile, setApiProfile] = useState(new ApiProfile());// link to class-driver user's profile

  useEffect(() => {
    AsyncStorage.getItem('token').then(result => {
      apiProfile.setToken(result);
      apiProfile.getProfile().then(() => {
        setAuth(true)      
      })

    }).catch(setAuth(false));

  }, [])

  // ------ settings ---------------------------------
  AsyncStorage.getItem('color', (err, result) => {
    switch (result) {
      case 'true': setColor(true)
        break
      case 'false': setColor(false)
        break
      default: setColor(true)
    }
  })
  AsyncStorage.getItem('lang', (err, result) => {
    switch (result) {
      case '0': setLang(0)
        break
      case '1': setLang(1) //rus
        break
      case '2': setLang(2)
        break
      default: setLang(1)
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
      <ApiProfileContext.Provider value={apiProfile}>

        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(setLoadingComplete, setColor)}
        />
      </ApiProfileContext.Provider>

    );
  } else {
    return (
      <ApiProfileContext.Provider value={apiProfile}>
        <View style={s.container}>

          {/* status bar margin */}
          {/* <View style={[s.marginStatusBar, {
          //backgroundColor: '#fff'
        }]} /> */}

          {
            !auth
              ? <StartScreen
                lang={lang}
                onLangChange={(langId) => {
                  AsyncStorage.setItem('lang', String(langId), () => setLang(langId))
                }}
                onMainScreen={() => setAuth(true)}
              />
              :
              <MainScreen
                lang={lang}
                onLangChange={(langId) => {
                  AsyncStorage.setItem('lang', String(langId), () => setLang(langId))
                }}
                onExit={() => setAuth(false)}
              />
          }
          <StatusBar hidden={false}
            barStyle="dark-content"
            translucent={true}
            backgroundColor={'transparent'}
          //backgroundColor={'#fff'}
          />
        </View>
      </ApiProfileContext.Provider>
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



