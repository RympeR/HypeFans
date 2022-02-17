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


let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import Carousel from 'react-native-snap-carousel';

let storyData = [
  { img: require('../../../assets/images/zemlia.jpg') },
  { img: require('../../../assets/images/photo2.png') },
  { img: require('../../../assets/images/photo4.png') },
  { img: require('../../../assets/images/39177.jpg') },
]

export default class Stories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: props.lang,
      navigation: props.navigation,
      //users: props.users,
      data: storyData,
      item: 0,
    };
  }




  componentDidMount() {
    this.props.setTab(false)
  }
  componentWillUnmount() {
    this.props.setTab(true)
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[s.storySlide]}
        activeOpacity={1}
        //onPress={() => navigation.navigate('UserPage', { user: user })}
        onPress={() => console.log('storyTap', index)}
      >
        <Image style={[s.storyImg]}
          source={item.img} />
        <TouchableOpacity style={[s.btn56, s.center, s.pabsolute, s.statBarMargin, {
          right: 0,
        }]}
          activeOpacity={0.7}
          onPress={() => {
            this.state.navigation.goBack()
          }}
        >
          <SvgUri width="25" height="25"
            source={require('../../../assets/images/close.svg')} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={[s.container, {backgroundColor: '#fff'}]}>

        <Carousel
          data={this.state.data}
          //data={carouselData}
          renderItem={this.renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => this.setState({ item: index })}
          autoplay={false}
          //autoplayDelay={1000}
          //autoplayInterval={3000}
          loop={false}
          inactiveSlideOpacity={1}
          inactiveSlideScale={0.7}
        />

      </View >
    );
  }
}
