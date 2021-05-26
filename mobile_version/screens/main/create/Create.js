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
  KeyboardAvoidingView,
  Keyboard,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

import TopGradient from '../../../components/TopGradient'
import VanishModal from './VanishModal'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let [buttons, setButtons] = React.useState(false)
  let [message, setMessage] = React.useState('')
  let [vanishModal, setVanishModal] = React.useState(false)
  let [image, setImage] = useState(null);
  let [video, setVideo] = useState(null);
  let [document, setDocument] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    console.log(result);

    if (!result.cancelled) {
      setVideo(result.uri);
    }
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
    });

    console.log(result);

    if (!result.cancelled) {
      setDocument(result.uri);
    }
  };

  return (
    <TouchableOpacity style={[s.container, s.backColor]}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn56, s.center]}
          activeOpacity={0.8}
          onPress={() => navigation.canGoBack() ? navigation.navigate('Blog') : props.onBack()}
        >
          <SvgUri width="20" height="20"
            source={require('../../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].create}</Text>

        <TouchableOpacity style={[s.btn56, s.center]}
          activeOpacity={0.8}
        //onPress={() => props.onSkip()}
        >
          {/* <SvgUri width="20" height="20"
            source={require('../../../assets/images/exit.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.selector, s.flexRow, s.spaceBtw, s.aCenter, s.mh15, s.mb10]}>
        <TouchableOpacity style={[s.selectorBtn, s.flex1, s.center]}
          activeOpacity={0.8}
        //onPress={() => props.onSkip()}
        >
          <Text style={[s.text15, s.factor, s.textBlack]}>{text[lang].newPost}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.h40, s.flex1, s.center]}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Story')
          }}
        //onPress={() => props.onStory()} nested
        >
          <Text style={[s.text15, s.factor, s.textBlack]}>{text[lang].newStory}</Text>
        </TouchableOpacity>
      </View>

      <TopGradient />

      {/* <KeyboardAvoidingView style={[]}
        behavior={platform ? "padding" : "height"}
      > */}
      <ScrollView style={[]}
        showsVerticalScrollIndicator={false}
      >

        <View style={[s.flexRow, s.aCenter, s.mh15]}>
          <Image
            style={[s.image60r, s.mr10]}
            source={require('../../../assets/images/ava3.png')}
          />
          <Text style={[s.text16, s.factorBold, s.textBlack]}>{'Вероника Топаз'}</Text>
        </View>
        <View style={[s.greyLine, s.mt15]} />

        <TextInput
          multiline={true}
          textAlignVertical={'top'}
          style={[s.text14, s.factor, s.textLine21, s.textBlack, s.mh15, s.mt15, { height: 120 }]}
          placeholder={text[lang].shareMind}
          placeholderTextColor={'#bcc9dc'}
          onChangeText={(txt) => setMessage(txt)}
        />

        <View style={[s.files, s.mh15, s.mt10, s.flexRow]} >
          {
            image && <TouchableOpacity style={[s.thumbBtn1, s.center, s.mr10]}
              activeOpacity={0.7}
              onPress={() => setImage(null)}
            >
              <Image source={[{ uri: image }]} style={[s.thumb]} />
              <View style={[s.pabsolute, { right: 0, top: 0 }]}>
                <SvgUri width="20" height="20"
                  source={require('../../../assets/images/x-circle.svg')} />
              </View>
            </TouchableOpacity>
          }
          {
            video && <TouchableOpacity style={[s.thumbBtn1, s.center, s.mr10]}
              activeOpacity={0.7}
              onPress={() => setVideo(null)}
            >
              <Image source={[{ uri: video }]} style={[s.thumb]} />
              <View style={[s.pabsolute, { right: 0, top: 0 }]}>
                <SvgUri width="20" height="20"
                  source={require('../../../assets/images/x-circle.svg')} />
              </View>
            </TouchableOpacity>
          }
          {
            document && <TouchableOpacity style={[s.thumbBtn1, s.center, s.mr10]}
              activeOpacity={0.7}
              onPress={() => setDocument(null)}
            >
              <Image style={[s.thumb]}
                source={require('../../../assets/images/music.png')}
              />
              <View style={[s.pabsolute, { right: 0, top: 0 }]}>
                {/* <SvgUri width="20" height="20"
                  source={require('../../../assets/images/x-circle.svg')} /> */}
              </View>
            </TouchableOpacity>
          }
        </View>


        <View style={[s.flexRow, s.mh15, s.mt10]}>
          {
            buttons
              ?
              <View style={[s.buttonsDrawer, s.flexRow]}>
                <TouchableOpacity style={[s.orangeRoundBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setButtons(!buttons)
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/skrepa.svg')} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.drawerBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    pickImage()
                    setButtons(!buttons)
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/image.svg')} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.drawerBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    pickVideo()
                    setButtons(!buttons)
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/video.svg')} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.drawerBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    pickDocument()
                    setButtons(!buttons)
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/mic.svg')} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.drawerBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    pickDocument()
                    setButtons(!buttons)
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/inbox.svg')} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.drawerBtn, s.center]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setButtons(!buttons)
                    setVanishModal(true)
                    //navigation.navigate('VanishModal')
                  }}
                >
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/clock.svg')} />
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity style={[s.orangeRoundBtn, s.center]}
                activeOpacity={0.8}
                onPress={() => setButtons(!buttons)}
              >
                <SvgUri width="30" height="30"
                  source={require('../../../assets/images/skrepa.svg')} />
              </TouchableOpacity>
          }
        </View>

        <View style={[s.greyLine, s.mt15]} />

        {
          message.length > 1
            ?
            <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15]}
              activeOpacity={0.9}
              onPress={() => navigation.canGoBack() ? navigation.navigate('Blog') : props.onBack()}
            >
              <Text style={[s.text18, s.factorBold]}>{text[lang].public}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[s.disableBtn, s.center, s.mt15]}
              activeOpacity={0.9}
            //onPress={() => props.onSkip()}
            >
              <Text style={[s.text18, s.factorBold, s.textGrey]}>{text[lang].public}</Text>
            </TouchableOpacity>
        }





        <View style={{ height: 60 }} />
      </ScrollView>
      {/* </KeyboardAvoidingView> */}

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={vanishModal}
        onBackButtonPress={() => setVanishModal(false)}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setVanishModal(false)}
      >
        <VanishModal
          lang={lang}
          onBack={() => setVanishModal(false)}
        />
      </RnModal>
    </TouchableOpacity >
  );
}
