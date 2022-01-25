import React from 'react';

import {
  Animated,
  View,
  Dimensions,
  Platform
} from 'react-native';

const { width, height } = Dimensions.get("screen")
import { LinearGradient } from 'expo-linear-gradient';
import s from '../styles/style'

export default function AvaGradient(props) {

  return (
    <Animated.View style={[s.container, s.pabsolute, {opacity: props.opac}]}>
      <LinearGradient
        style={[s.container, {
          height: 124,
          width: 124,
          borderRadius: 62,
        }]}
        colors={['#FF6644', '#FF485C']}
        start={[0, 0]} end={[0, 1]}
      />
    </Animated.View>
  );
}
