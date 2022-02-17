import React from 'react';

import {
    View,
    Dimensions, 
    Platform
  } from 'react-native';

const { width, height } = Dimensions.get("screen")
import { LinearGradient } from 'expo-linear-gradient';
import s from '../styles/style'

export default function AvaGradient(props) {


  return (
    <View style={[s.container, s.pabsolute]}>
        <LinearGradient 
            style={[s.container, {
                height: 68,
                width: 68,
                borderRadius: 34,
            }]}
            colors={['#FF6644', '#FF485C']}
            start={[0, 0]} end={[0, 1]}
        />
    </View>
  );
}
