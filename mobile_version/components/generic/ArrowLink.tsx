import { Text, TouchableOpacity, View } from "react-native"
import s from '../../styles/style';
import React from 'react';
import SvgUri from "expo-svg-uri";

export default function ArrowLink({ label, onPress }) {
    return (<React.Fragment>

        <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={[s.text18, s.factor, s.textBlack]}>{label}</Text>
            <View style={[s.mh15]}>
                <SvgUri width="16" height="16"
                    source={require('../../assets/images/forward.svg')} />
            </View>
        </TouchableOpacity>
        <View style={[s.greyLine, s.mh15]} />
    </React.Fragment>
    );
}

