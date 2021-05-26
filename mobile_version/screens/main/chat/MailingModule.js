import React from 'react';

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

let platform = Platform.OS === 'ios' ? true : false

import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from "expo-svg-uri"
import {
  GiftedChat, Bubble, InputToolbar,
  LeftAction, ChatInput, Send, Composer, Actions, Day
} from 'react-native-gifted-chat'
import * as DocumentPicker from 'expo-document-picker'

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      navigation: props.navigation,
      messages: [],
      users: props.users,
      user: props.user,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      document: null,
    };
    this.onSend = this.onSend.bind(this);
  }

  async componentDidMount() {
    this.props.setTab(false)
    this.setState({
      messages: [],
    });
  }

  componentWillUnmount() {
    this.props.setTab(true)
  }

  pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ document: result.uri });
    }
  };

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  // --- Customizations ------------------------------

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#e7cecb',
            borderRadius: 5,
            //bottom: 20
          },
          left: {
            backgroundColor: '#F8F1F0',
            borderRadius: 5,
            //bottom: 20
          }
        }}
        textStyle={{
          right: {
            fontFamily: 'factor_a',
            color: '#000',
          },
          left: {
            fontFamily: 'factor_a',
            color: '#000',
          },
        }}
      />
    )
  }

  renderInputToolbar = (props) => {
    return (
      <View style={[{ backgroundColor: '#F8F1F0', bottom: 2 }]}>
        <View style={[s.inputContainer, s.flexRow, s.alignCenter, s.mb20]}>
          <TouchableOpacity style={[s.btn50, s.center, { bottom: 2 }]}
            onPress={() => { this.pickDocument() }}
          >
            <SvgUri width="25" height="25"
              source={require('../../../assets/images/orangeScrep.svg')} />
          </TouchableOpacity>
          {/* <Actions {...props}/> */}
          <Composer {...props}
            multiline={false}
            textInputStyle={[{
              color: '#000',
              backgroundColor: '#F8F1F0',
              // borderRadius: 10,
              paddingHorizontal: 10,
              // composerHeight: 40,
            }]}
            textInputProps={{
              ...props.textInputProps,
              onSubmitEditing: () => {
                if (props.text && props.onSend) {
                  props.onSend({ text: props.text.trim() }, true);
                }
              }
            }}
            placeholderTextColor={'#969896'}
            placeholder={text[this.state.lang].urMess}
          />

          <Send {...props}
            textStyle={{
              color: '#fff'
            }}
            containerStyle={[s.center]}
            label={''}
            children={
              <TouchableOpacity style={[s.btn50, s.center]}
                onPress={() => {
                  if (props.text && props.onSend) {
                    props.onSend({ text: props.text.trim() }, true);
                  }
                }}
                onLongPress={() => {
                  this.setState({ priceModal: true })
                }}
              >
                <SvgUri width="25" height="25"
                  source={require('../../../assets/images/send2.svg')} />
              </TouchableOpacity>
            }
          />
        </View>


      </View>

    )
  }

  renderDay = (props) => {
    return (
      // <View {...props}></View>
      <Day
        {...props}
        wrapperStyle={[{
          //bottom: 20,
        }]}
      // dateFormat={''}
      />
    )
  }


  render() {
    return (
      <View style={[s.container, s.backColor]} >

        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
            onPress={() => this.state.navigation.goBack()}
          >
            <SvgUri width="16" height="16"
              source={require('../../../assets/images/back.svg')} />
          </TouchableOpacity>
          <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[this.state.lang].newMess}</Text>

          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
          //onPress={() => navigation.navigate('NoteSettings')}
          >
            {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
          </TouchableOpacity>
        </View>

        <View style={[s.pinkLine]} />

        {/* friends */}
        <View style={[s.mt10, this.state.check1 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => this.setState({ check1: !this.state.check1 })}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[this.state.lang].friends}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt5]}>{8}</Text>
              </View>
              {
                this.state.check1
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>

        {/* newSubscribers  subs*/}
        <View style={[this.state.check2 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => this.setState({ check2: !this.state.check2 })}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[this.state.lang].newSubscribers}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt5]}>{4}</Text>
              </View>
              {
                this.state.check2
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>


        {/* scecial spec*/}
        <View style={[this.state.check3 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => this.setState({ check3: !this.state.check3 })}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[this.state.lang].scecial}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt5]}>{5}</Text>
              </View>
              {
                this.state.check3
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>


        {/* donuters */}
        <View style={[this.state.check4 ? s.pinkBack : null]}>
          <TouchableOpacity style={[s.mt10, s.mh15]}
            activeOpacity={0.7}
            onPress={() => this.setState({ check4: !this.state.check4 })}
          >
            <View style={[s.flexRow, s.spaceBtw, s.aCenter, s.mt5]}>
              <View style={[]}>
                <Text style={[s.text18, s.factorBold, s.textBlack]}>{text[this.state.lang].donuters}</Text>
                <Text style={[s.text18, s.factor, s.textGrey, s.mt5]}>{7}</Text>
              </View>
              {
                this.state.check4
                  ?
                  <View style={[s.checked, s.center]}>
                    <LinearGradient
                      style={[s.checkGradient]}
                      colors={['#FF6644', '#FF485C']}
                      start={[0, 0]} end={[0, 1]}
                    />
                  </View>
                  : <View style={[s.checkBox]} />
              }
            </View>
          </TouchableOpacity>
          <View style={[s.greyLine, s.mt10, s.mh15]} />
        </View>


        <TopGradient />

        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderAvatar={() => null}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderDay={this.renderDay}
          onLongPress={(data) => console.log('longpressed buble', data)}
          user={{
            _id: 1,
          }}
        />


      </View >
    );
  }
}