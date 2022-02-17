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
import MessagePrice from './MessagePrice'
import ChatSettings from './ChatSettings'

let platform = Platform.OS === 'ios' ? true : false

import RnModal from 'react-native-modal';
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
      priceModal: false,
      chatSettings: false,
      navigation: props.navigation,
      messages: [],
      //user: props.data ? props.data.user : props.route.params.user,
      user: props.route.params.user,
      document: null,
    };
    this.onSend = this.onSend.bind(this);
  }

  async componentDidMount() {
    this.props.setTab(false)
    this.setState({
      messages: [
        {
          _id: 2,
          text: 'Окей, до встречи',
          createdAt: new Date(Date.UTC(2021, 7, 30, 17, 20, 0)),
          user: {
            _id: 1,
            name: 'React Native',
            //avatar: contact.avatar,
          },
          //image: 'https://blog.rcdetails.info/wp-content/uploads/2019/09/Runcam-Hybrid-4K-HD-FPV-compare-full-micro-cameras-size-1024x683.jpg',
          // You can also add a video prop:
          // video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          // Mark the message as sent, using one tick
          sent: true,
          // Mark the message as received, using two tick
          received: true,
          // Mark the message as pending with a clock loader
          // pending: true,
          // Any additional custom parameters are passed through
        },
        {
          _id: 1,
          text: 'Так я буду аж в 8 дома только ',
          createdAt: new Date(Date.UTC(2021, 5, 11, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            //avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },

      ],
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
      this.setState({document: result.uri});
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


          <View style={[s.flexRow, s.aCenter]}>
            <TouchableOpacity style={[s.btn50, s.center]}
              activeOpacity={0.8}
              //onPress={() => this.state.navigation.canGoBack() ? this.state.navigation.goBack() : this.state.navigation.navigate('Chat')}
              onPress={() => this.state.navigation.goBack()}
            >
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/back.svg')} />
            </TouchableOpacity>
            <TouchableOpacity style={[s.image50r, s.center, s.mr10]}
              activeOpacity={0.8}
              onPress={() => this.state.navigation.navigate('UserPage', { user: this.state.user })}
            >
              <Image
                style={[s.image50r]}
                source={this.state.user.ava}
              />
            </TouchableOpacity>
            <View style={[]}>
              <Text style={[s.text18, s.factorBold, s.textBlack]}>{this.state.user.name}</Text>
              <Text style={[s.text18, s.factor, s.textGrey]}>{this.state.user.nick}</Text>
            </View>
            {/* <View style={[s.flex1]}/> */}
          </View>



          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.7}
            onPress={() => this.setState({ chatSettings: true })}
          >
            <SvgUri width="20" height="20"
              source={require('../../../assets/images/3dots.svg')} />
          </TouchableOpacity>
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


        <RnModal
          style={{ margin: 0 }}
          coverScreen={false}
          isVisible={this.state.priceModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          scrollOffset={100}
          swipeDirection={'down'}
          onSwipeComplete={() => this.setState({ priceModal: false })}
        >
          <MessagePrice
            lang={this.state.lang}
            onBack={() => this.setState({ priceModal: false })}
          />
        </RnModal>

        <RnModal
          style={{ margin: 0 }}
          coverScreen={false}
          isVisible={this.state.chatSettings}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          scrollOffset={100}
          swipeDirection={'down'}
          onSwipeComplete={() => this.setState({ chatSettings: false })}
        >
          <ChatSettings
            lang={this.state.lang}
            onBack={() => this.setState({ chatSettings: false })}
          />
        </RnModal>


      </View >
    );
  }
}