import { StyleSheet, Text, TextInput, View } from "react-native"
import s from '../../styles/style';
import React, { useState } from 'react';
import SvgUri from "expo-svg-uri";

export default function InputGeneric({label, placeholder, value, incorrect, onChange, fixTextInput, validator, multiline=false}){
    const [currentValue, setCurrentValue] = useState(value);
    const [validate, setValidate] = useState(false);
    // console.log(currentValue);
    const stypeTextInput = [s.input, s.text14, s.factor, s.flex1, s.mh15,
      incorrect ? s.textRed : s.textBlack];
      if(multiline){
        // stypeTextInput.push(s.textLine21);
        stypeTextInput.push(s.textLine21);
        stypeTextInput.push(s.mt10);
        stypeTextInput.push(s.mb10);
        // stypeTextInput.push(s.mt10);
        // stypeTextInput.push(s.mb10);
        
      }else{
        stypeTextInput.push(s.h46);

        
      }
      // console.log(stypeTextInput);
    return  (<>
            <Text style={[s.text14, s.factor, s.textBlack, s.mh15, s.mt15]}>{label}</Text>
            <View style={[s.inputBlock, s.mt15, s.mh15, s.flexRow, s.spaceBtw, multiline ? null : s.alignCenter,
            { borderColor: '#aaa' }, multiline ? { height: 120 } : null
            ]}>
              <Text style={[s.text14, s.factor, s.textBlack, s.ml15,]}>{fixTextInput ? fixTextInput : null}</Text>
              <TextInput
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : null}
                keyboardType={'default'}
                style={stypeTextInput}
                placeholder={placeholder || label}
                placeholderTextColor={'#aaa'}
                onChangeText={(val) => 
                  { setValidate(validator ? validator(val): true); 
                    setCurrentValue(val);
                    
                  }}
                value={currentValue}
                onEndEditing={()=>onChange(currentValue)}
              />
              {
                validate && validator //if validator is not defined as did not show 
                  ?
                  <View style={[s.mh15]}>
                    <SvgUri width="16" height="16"
                      source={require('../../assets/images/check.svg')} />
                  </View>
                  : null
              }
            </View>
            </>
            );
}

