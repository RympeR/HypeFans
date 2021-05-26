import React, { useState, useEffect, useRef } from 'react';
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

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  //const { user } = props.route.params;
  let user = { nick: '@niikkirose ', name: 'Nikki Rose', ava: require('../../../assets/images/avaA.png'), photo: require('../../../assets/images/photo8.png') }

  let [avaImg, setAvaImg] = useState(null)
  let [photoImg, setPhotoImg] = useState(null)
  let [incorrect, setIncorrect] = React.useState(false)
  let [acceptable, setAcceptable] = React.useState(false)

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
        <View style={[s.backgroundImage, s.pabsolute]}>
          <Animated.Image
            style={[s.backgroundImage, { height: backgroundImageH, opacity: backgroundImageOpacity }]}
            source={
              photoImg
                ? [{ uri: photoImg }]
                : user.photo
            }
          />
          <TouchableOpacity style={[s.btn50, s.center, s.pabsolute, { left: (width - 50) / 2, top: 70 }]}
            activeOpacity={0.8}
            onPress={pickPhoto}
          >
            <SvgUri width="40" height="40"
              source={require('../../../assets/images/camera2.svg')} />
          </TouchableOpacity>
        </View>

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

          <TouchableOpacity style={[s.btn50, s.center, s.mt15]}
            activeOpacity={0.6}
          //onPress={() => setUserSettings(true)}
          >
          </TouchableOpacity>
        </View>



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

          <View style={[{
            paddingTop: H_MAX_HEIGHT
          }]}>

            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].name}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
            { borderColor: false ? '#f52424' : '#aaa' }
            ]}>
              <TextInput
                keyboardType={'default'}
                style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
                incorrect ? s.textRed : s.textBlack]}
                placeholder={text[lang].name}
                placeholderTextColor={'#aaa'}
              />
            </View>

            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].nick}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
            { borderColor: incorrect ? '#f52424' : '#aaa' }
            ]}>
              <Text style={[s.text14, s.factor, s.textBlack, s.ml15,]}>{'@'}</Text>
              <TextInput
                keyboardType={'email-address'}
                style={[s.input, s.text14, s.factor, s.flex1, s.h46,
                incorrect ? s.textRed : s.textBlack]}
                placeholder={text[lang].nick}
                placeholderTextColor={'#aaa'}
                //onFocus={() => setFocus(true)}
                //onBlur={() => setFocus(false)}
                onChangeText={(txt) => txt.length > 0 ? setAcceptable(true) : setAcceptable(false)}
              />
              {
                acceptable
                  ?
                  <View style={[s.mh15]}>
                    <SvgUri width="16" height="16"
                      source={require('../../../assets/images/check.svg')} />
                  </View>
                  : null
              }
            </View>

            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].bio}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, { height: 120 },
            { borderColor: false ? '#f52424' : '#aaa' }
            ]}>
              <TextInput
                multiline={true}
                textAlignVertical={'top'}
                style={[s.text14, s.factor, s.textLine21, s.flex1, s.mh15, s.mt10, s.mb10,
                incorrect ? s.textRed : s.textBlack]}
                placeholder={text[lang].bio}
                placeholderTextColor={'#aaa'}
              />
            </View>

            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].geo}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
            { borderColor: false ? '#f52424' : '#aaa' }
            ]}>
              <TextInput
                keyboardType={'default'}
                style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
                incorrect ? s.textRed : s.textBlack]}
                placeholder={text[lang].geoPlc}
                placeholderTextColor={'#aaa'}
              />
            </View>

            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{text[lang].site}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
            { borderColor: false ? '#f52424' : '#aaa' }
            ]}>
              <TextInput
                keyboardType={'default'}
                style={[s.input, s.text14, s.factor, s.flex1, s.h46, s.mh15,
                incorrect ? s.textRed : s.textBlack]}
                placeholder={text[lang].sitePlh}
                placeholderTextColor={'#aaa'}
              />
            </View>

            <View style={[s.pinkLine, s.mt15]} />

            <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('MessageCost')}
            >
              <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].msgCost}</Text>
              <View style={[s.mh15]}>
                <SvgUri width="16" height="16"
                  source={require('../../../assets/images/forward.svg')} />
              </View>
            </TouchableOpacity>
            <View style={[s.greyLine, s.mh15]} />

            <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SubscribeCost')}
            >
              <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].price}</Text>
              <View style={[s.mh15]}>
                <SvgUri width="16" height="16"
                  source={require('../../../assets/images/forward.svg')} />
              </View>
            </TouchableOpacity>
            <View style={[s.greyLine, s.mh15]} />

            <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ForFuns')}
            >
              <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].forFun}</Text>
              <View style={[s.mh15]}>
                <SvgUri width="16" height="16"
                  source={require('../../../assets/images/forward.svg')} />
              </View>
            </TouchableOpacity>



            <View style={{ height: 60 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </View >
  );
}
