import React from 'react';

import {
    View,
    Dimensions, 
    Platform
  } from 'react-native';

const { width, height } = Dimensions.get("screen")
import { LinearGradient } from 'expo-linear-gradient';
import s from '../styles/style'

export default function botGradient(props) {

let lgHeight = props.height || 5

  return (
    <View style={{height: 1, zIndex: 2}}>
        <LinearGradient 
            style={[s.pabsolute,{
                height: lgHeight,
                width: width,
                bottom: 0,
            }]}
            colors={['rgba(255, 255, 255, 0)', '#fff']}
            start={[0, 0]} end={[0, 1]}
        />
    </View>
  );
}
