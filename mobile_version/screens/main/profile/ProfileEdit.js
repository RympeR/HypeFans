import React, { useState, useEffect, useRef, useContext } from 'react';
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
  Keyboard,
  View,
  Dimensions,
  Alert,
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

import TopGradient from '../../../components/TopGradient'
import ProfileGradient from '../../../components/ProfileGradient'

let platform = Platform.OS === 'ios' ? true : false
let longIos = height / width > 2 && Platform.OS === 'ios'

import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';

import BlogModal from '../blog/BlogModal'
import UserSettings from './UserSettings'
import ApiProfileContext from '../../../apiProfileContext';
import InputGeneric from '../../../components/generic/InputGeneric';
import ArrowLink from '../../../components/generic/ArrowLink';


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  //const { user } = props.route.params;
  let user = { nick: '@niikkirose ', name: 'Nikki Rose', ava: require('../../../assets/images/avaA.png'), photo: require('../../../assets/images/photo8.png') }

  let [avaImg, setAvaImg] = useState(null)
  let [photoImg, setPhotoImg] = useState(null)
  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)

  const apiProfile = useContext(ApiProfileContext);

  // Hide navBar on keyboard open --------------------------------------------
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // Image picker
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => props.setTab(false);
  const _keyboardDidHide = () => props.setTab(true);

  // -------------------------------------------------------------------
  const pickAva = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setAvaImg(result.uri);
    }
  };

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPhotoImg(result.uri);
    }

    //saving
    // data.append('background_photo', result);
    result = await apiProfile.updateUser({background_photo: result});
    console.log("result update ");
    console.log(result);
    // .then(()=> Alert.alert("Фото","Фото фона обновлено!")).catch(()=>Alert.alert("Ошибка","фото не обновлено"));
    await apiProfile.getProfile();
    // console.log(apiProfile.dataProfile);
  };

  // Animation ----------------------------------------------------------
  let baseH = 260
  let baseHmin = 100
  const H_MAX_HEIGHT = longIos ? (baseH + 20) : (platform ? baseH : (baseH + 10));
  const H_MIN_HEIGHT = longIos ? (baseHmin + 30) : baseHmin;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;


  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  const backgroundImageH_Min = 0 // 50
  const backgroundImageH_Max = 200
  const backgroundImageH = scrollOffsetY.interpolate({
    inputRange: [0, backgroundImageH_Max], // H_SCROLL_DISTANCE
    outputRange: [backgroundImageH_Max, backgroundImageH_Min],
    extrapolate: "clamp"
  });
  const backgroundImageOpacity = scrollOffsetY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });
  const invertedOpacity = scrollOffsetY.interpolate({
    inputRange: [200, 250],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const storyOpacity = scrollOffsetY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });


  const avaTop_Min = -55
  const avaTop_Max = 45
  const avaTop = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaTop_Max, avaTop_Min],
    extrapolate: "clamp"
  });


  // ----------------------------------------------------------------------



  return (
    <View style={[s.container, s.backColor]}>

      {/* animated header */}
      <Animated.View
        style={[s.animHeader, s.mb40, s.pabsolute, s.backColor,
        { height: headerScrollHeight }]}
      >
        {/* top background image */}
        <View style={[s.backgroundImage, s.pabsolute]}>
          <Animated.Image
            style={[s.backgroundImage, { height: backgroundImageH, opacity: backgroundImageOpacity }]}
            source={
              photoImg
                ? [{ uri: photoImg }]
                : user.photo
            }
          />
          {/* change main photo */}
          <TouchableOpacity style={[s.btn50, s.center, s.pabsolute, { left: (width - 50) / 2, top: 70 }]}
            activeOpacity={0.8}
            onPress={pickPhoto}
          >
            <SvgUri width="40" height="40"
              source={require('../../../assets/images/camera2.svg')} />
          </TouchableOpacity>
        </View>

        {/* top buttons' bar */}
        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin, s.mb15]}>

          <Animated.Image
            style={[s.image50r, s.pabsolute, {
              top: 14,
              left: 55,
              opacity: invertedOpacity,
            }]}
            source={
              avaImg
                ? [{ uri: avaImg }]
                : user.ava
            }
          />

          {/* top button back */}
          <TouchableOpacity style={[s.btn50, s.center, s.mt25]}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Animated.View style={[s.pabsolute, { opacity: backgroundImageOpacity }]}>
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/backW.svg')} />
            </Animated.View>
            <Animated.View style={[s.pabsolute, { opacity: invertedOpacity }]}>
              <SvgUri width="16" height="16"
                source={require('../../../assets/images/back.svg')} />
            </Animated.View>
          </TouchableOpacity>
          {/* ??? */}
          <TouchableOpacity style={[s.btn50, s.center, s.mt15]}
            activeOpacity={0.6}
          //onPress={() => setUserSettings(true)}
          >
          </TouchableOpacity>
        </View>


        {/* round photo */}
        <View style={[s.animatedView, s.flex1]}>
          <Animated.View style={[s.avaWrap, s.center, { top: avaTop, opacity: storyOpacity }]}>
            <Animated.Image
              style={[s.profileAva, { opacity: storyOpacity }]}
              source={
                avaImg
                  ? [{ uri: avaImg }]
                  : user.ava
              }
            />
            <TouchableOpacity style={[s.btn56, s.center, s.pabsolute,
            { opacity: backgroundImageOpacity }
            ]}
              activeOpacity={0.8}
              onPress={pickAva}
            >
              <SvgUri width="40" height="40"
                source={require('../../../assets/images/camera1.svg')} />
            </TouchableOpacity>
          </Animated.View>

        </View>


        {/* --- Static bottom --- */}
        {/* <View style={[s.greyLine]} /> */}
      </Animated.View>


      {/* ---   ScrollView   -------------------------------------------- */}
      <KeyboardAvoidingView style={[]}
        behavior={platform ? "padding" : "height"}
      >
        <ScrollView style={[]}
          showsVerticalScrollIndicator={false}

          onScroll={
            Animated.event([
              { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
            ],
              { useNativeDriver: false })}
          scrollEventThrottle={16}
        >

          {/*  profile's fields --> */}

          <View style={[{
            paddingTop: H_MAX_HEIGHT
          }]}>
            <InputGeneric label={text[lang].name} incorrect={incorrect} onChange={(val) => apiProfile.updateUser({ first_name: val })} />
            <InputGeneric label={text[lang].nick} incorrect={incorrect}
              onChange={(val) => apiProfile.updateUser({ username: val })}
              fixTextInput="@"
              validator={apiProfile.validateLogin}
            />

            <InputGeneric label={text[lang].bio} incorrect={incorrect} onChange={(val) => apiProfile.updateUser({ bio: val })} multiline />
            <InputGeneric label={text[lang].geo} incorrect={incorrect} onChange={(val) => apiProfile.updateUser({ location: val })} />
            <InputGeneric label={text[lang].site} placeholder={text[lang].sitePlh} incorrect={incorrect} onChange={()=>Alert.alert("Куда ж его записать-то?","?????????????????")} />
            <View style={[s.pinkLine, s.mt15]} />

            <ArrowLink label={text[lang].msgCost} onPress={() => navigation.navigate('MessageCost')} />
            <ArrowLink label={text[lang].price} onPress={() => navigation.navigate('SubscribeCost')} />
            <ArrowLink label={text[lang].forFun} onPress={() => navigation.navigate('ForFuns')} />

            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </View >
  );
}
