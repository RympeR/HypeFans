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


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      navigation: props.navigation,
      users: props.users,
      chatList: [],
    };
  }


  async componentDidMount() {
    this.props.setTab(true)
    this.setState({
      chatList: [
        { user: this.state.users[0], lastMsg: 'Oi dude', time: '2 часа назад', media: true },
        { user: this.state.users[1], lastMsg: 'Would you like to hangin on with me like to hangin on with me', time: '3 часа назад', media: false },
        { user: this.state.users[2], lastMsg: 'Oi dude', time: '4 часа назад', media: true, pay: false },
        { user: this.state.users[3], lastMsg: 'Oi dude', time: '5 часа назад', media: true, pay: true },
      ]
    })
  }

  render() {
    return (
      <View style={[s.container, s.backColor]} >

        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
          //onPress={() => props.onBack()}
          >
            {/* <SvgUri width="20" height="20"
            source={require('../../../assets/images/back.svg')} /> */}
          </TouchableOpacity>
          {
            width > 350
              ?
              <View style={[s.btn50]} />
              : null
          }

          <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[this.state.lang].chat}</Text>

          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.7}
            onPress={() => this.state.navigation.navigate('CreateChat')}
          >
            <SvgUri width="23" height="23"
              source={require('../../../assets/images/plus.svg')} />
          </TouchableOpacity>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.7}
            //onPress={() =>  this.state.navigation.navigate('Mailing')} 
            onPress={() => this.state.navigation.navigate('MailingModule')}
          >
            <SvgUri width="20" height="20"
              source={require('../../../assets/images/users.svg')} />
          </TouchableOpacity>
        </View>

        <ScrollView style={[]} showsVerticalScrollIndicator={false}>

          {
            this.state.chatList.length > 0
              ?
              this.state.chatList.map((entry, index) => {
                return (
                  <View key={index} style={[s.chatListEntry, s.mh15, s.mt10]}>
                    <View style={[s.flexRow]}>

                      <TouchableOpacity style={[s.image50r, s.center, s.mr10]}
                        activeOpacity={0.7}
                        onPress={() => {this.state.navigation.navigate('UserPage', { user: entry.user })}}
                      >
                        <Image
                          style={[s.image50r]}
                          source={entry.user.ava}
                        />
                      </TouchableOpacity>


                      <TouchableOpacity style={[s.flex1, s.jCenter]}
                        activeOpacity={0.7}
                        onPress={() => { entry.pay
                          ? this.state.navigation.navigate('PaidChat', { user: entry.user })
                          : this.state.navigation.navigate('ChatModule', { user: entry.user })}}
                      >
                        <View style={[s.flexRow, s.aCenter, s.spaceBtw]}>
                          <Text numberOfLines={1} style={[s.text18, s.factorBold, s.textBlack, s.mr5, { width: width - 180 }]}>{entry.user.name}</Text>
                          <Text numberOfLines={1} style={[s.text12, s.factor, s.textGrey2]}>{entry.time}</Text>
                        </View>
                        {
                          entry.media
                            ? <View style={[s.flexRow, s.aCenter, s.mt5]}>
                              <SvgUri width="24" height="24"
                                source={require('../../../assets/images/media.svg')} />

                              <Text style={[s.text14, s.factor, s.textGrey2, s.ml5]}>{'media attachment'}</Text>
                            </View>
                            : <Text numberOfLines={1} style={[s.text14, s.factor, s.textGrey2, s.mt8]}>{entry.lastMsg}</Text>
                        }

                      </TouchableOpacity>
                    </View>
                    { index != this.state.chatList.length - 1 ? <View style={[s.greyLine, s.mt15]} /> : null}

                  </View>
                )
              })

              : <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[this.state.lang].emptyList}</Text>
          }

        </ScrollView>
      </View >
    );
  }
}
