import React, { PureComponent } from 'react';
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

import AvaGradient from '../../../components/AvaGradient'

let platform = Platform.OS === 'ios' ? true : false

import { Camera } from 'expo-camera'
import SvgUri from "expo-svg-uri"
import * as ImagePicker from 'expo-image-picker';

export default class Cam extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      loop: true,
      lang: props.lang,
      navigation: props.navigation,
      cameraType: false,
      url: null,
    };
  }

  async componentDidMount() {
    this.props.setTab(false)
    const { status } = await Camera.requestPermissionsAsync()
  }

  componentWillUnmount() {
    this.props.setTab(true)
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {

      //this.setState({ imageUri: result.uri })

      this.state.navigation.navigate('Editor', {uri: result.uri})
    
    } 
  };

  __takePicture = async () => {
    const options = {quality: 0.2}
    let photo = await this.camera.takePictureAsync(options);
    //this.setState({ url: photo.uri })
    this.state.navigation.navigate('Editor', {uri: photo.uri})
  }

  render() {
    return (
      <View style={[s.container, s.test]}>

        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          ratio={'16:9'}

          //style={{ flex: 1 }}
          style={{ width: (9 * height) / 16, height: height }}
          captureAudio={false}
          type={this.state.cameraType
            ? Camera.Constants.Type.back
            : Camera.Constants.Type.front
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />

        <View style={[s.hud, s.pabsolute]}>
          <View style={[s.statBarMargin]} />

          <View style={[s.selector2, s.flexRow, s.spaceBtw, s.aCenter, s.mh15, s.mt30]}>
            <TouchableOpacity style={[s.h40, s.flex1, s.center]}
              activeOpacity={0.7}
              onPress={() => {
                this.state.navigation.navigate('Create')
              }}
            >
              <Text style={[s.text15, s.factor]}>{text[this.state.lang].newPost}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.selector2Btn, s.flex1, s.center]}
              activeOpacity={0.8}
            //onPress={() => props.onSkip()}
            >
              <Text style={[s.text15, s.factor, s.textBlack]}>{text[this.state.lang].newStory}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[s.btn56, s.center]}
            activeOpacity={0.7}
            onPress={() => {
              this.state.navigation.goBack()
            }}
          >
            <SvgUri width="25" height="25"
              source={require('../../../assets/images/close.svg')} />
          </TouchableOpacity>

          <View style={[s.flex1]} />

          <View style={[s.bottomControlls, s.flexRow, s.spaceBtw, s.aCenter, s.mh15, platform ? s.ip10mb : s.mb50 ]}>

            <TouchableOpacity style={[s.thumbBtnWr, s.center]}
              activeOpacity={0.8}
              onPress={this.pickImage}
            >
              <Image
                style={[s.thumbBtn]}
                source={require('../../../assets/images/thumb3.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity style={[s.personIcon, s.center]}
              activeOpacity={0.8}
              onPress={this.__takePicture}
            >
              <AvaGradient style={[s.pabsolute]} />
              <View style={[s.whiteRoundBtn]} />
            </TouchableOpacity>

            <TouchableOpacity style={[s.btn56, s.center, {width: 62}]}
              activeOpacity={0.8}
              onPress={() => this.setState({ cameraType: !this.state.cameraType })}
            >
              <SvgUri width="40" height="40"
                source={require('../../../assets/images/camera.svg')} />
            </TouchableOpacity>

          </View>


        </View>
      </View >
    );
  }
}
