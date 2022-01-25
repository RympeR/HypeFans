import React from 'react';

import {
    View,
    Dimensions, 
    Platform
  } from 'react-native';

const { width, height } = Dimensions.get("screen")
import { LinearGradient } from 'expo-linear-gradient';
import s from '../styles/style'

export default function topGradient(props) {

let lgHeight = props.height || 5

  return (
    <View style={{height: 1, zIndex: 2}}>
        <LinearGradient 
            style={[s.pabsolute, {
                height: lgHeight,
                width: width,
            }]}
            colors={['#fff', 'rgba(255, 255, 255, 0)']}
            start={[0, 0]} end={[0, 1]}
        />
    </View>
  );
}
