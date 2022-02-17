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


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import * as ImagePicker from 'expo-image-picker';
import { ImageEditor } from "expo-image-editor";

export default class Editor extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      navigation: props.navigation,
      imageUri: props.route.params.uri,
      editorVisible: true,

    };
  }


  async componentDidMount() {
    //this.props.setTab(false)

    // (async () => {
    //   if (Platform.OS !== 'web') {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //       alert('Sorry, we need camera roll permissions to make this work!');
    //       this.state.navigation.goBack()
    //     } else this.pickImage()
    //   }
    // })();
    //this.launchEditor()
  }

  componentWillUnmount() {
    //this.props.setTab(true)
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

      this.setState({ imageUri: result.uri })

      // TODO: editor
      //setTimeout(()=>this.launchEditor(), 100)
      this.launchEditor()
    
    } else this.state.navigation.goBack()
  };

  launchEditor = (uri) => {

    this.setState({ editorVisible: true })
  };

  render() {
    return (
      <View style={[s.container, s.backColor]}>
        {
          this.state.imageUri && <Image
            style={[s.backImageStory, s.pabsolute]}
            source={[{ uri: this.state.imageUri }]}
          />
        }

        <ImageEditor
          visible={this.state.editorVisible}
          onCloseEditor={() => this.setState({ editorVisible: false })}
          imageUri={this.state.imageUri}
          fixedCropAspectRatio={16 / 9}
          //lockAspectRatio={aspectLock}
          minimumCropDimensions={{
            width: 100,
            height: 100,
          }}
          onEditingComplete={(result) => this.setState({ imageUri: result.uri })}
        />

        <TouchableOpacity style={[s.btn56, s.center, s.pabsolute, s.mh15, s.statBarMargin]}
          activeOpacity={0.7}
          onPress={() => {
            this.state.navigation.goBack()
          }}
        >
          <SvgUri width="25" height="25"
            source={require('../../../assets/images/close.svg')} />
        </TouchableOpacity>

        <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15, s.pabsolute, { width: width - 30, bottom: 50 }]}
          activeOpacity={0.9}
          onPress={() => this.state.navigation.navigate('Create')}
        >
          <Text style={[s.text18, s.factorBold]}>{text[this.state.lang].public}</Text>
        </TouchableOpacity>

      </View >
    );
  }
}
