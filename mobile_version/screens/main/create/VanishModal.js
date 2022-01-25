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
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import DropDownPicker from 'react-native-dropdown-picker';

export default function Screen(props) {

  let lang = props.lang

  const [list, setList] = useState(false);

  let terms = [
    { label: text[lang].day, value: 1, },
    { label: text[lang].thrDays, value: 3, },
    { label: text[lang].week, value: 7, },
    { label: text[lang].month, value: 30, },
    { label: text[lang].unlimited, value: 0, },
  ]
  const [activeTerm, setActiveTerm] = useState(terms[4]);
  

  let arrowUp = () => <Image style={[s.image9, s.ml10]} source={require('../../../assets/images/down.png')} />
  let arrowDown = () => <Image style={[s.image9, s.ml10]} source={require('../../../assets/images/down.png')} />


  return (
    <TouchableOpacity style={[s.container, s.aCenter]}
      activeOpacity={1}
      onPress={() => props.onBack()}
    >
      <View style={[s.vanishModal]}>
        <Text style={[s.text18, s.factorBold, s.textBlack, s.textCenter, s.mh15, s.mt15]}>{text[lang].vanishPost} </Text>
        {
          false //platform
            ? //droplist works only on ios
            <DropDownPicker
              zIndex={1000}
              items={terms}
              arrowSize={28}
              arrowColor={'#fff'}
              defaultValue={0}
              //placeholder={text[lang].unlimited}
              placeholderStyle={[s.text14, s.tera, s.textBlack, s.textCenter]}
              //activeItemStyle={{justifyContent: 'center'}}
              //activeLabelStyle ={[s.text15, s.tera, s.textBlack, s.textCenter]}
              //labelStyle={[{fontSize: 28, textAlign: 'center',}]}
              containerStyle={[s.droPicker, s.mt15, s.mh15]}
              style={[{ backgroundColor: 'rgba(255, 255, 255, 0.0)', borderWidth: 0, }]}
              //itemStyle={[s.aCenter, s.textCenter]}
              itemStyle={[{ justifyContent: 'flex-start' }]}
              dropDownStyle={{ backgroundColor: '#F8F1F0', borderWidth: 0 }}
              labelStyle={[s.text14, s.tera, s.textBlack, s.aCenter, s.textCenter]}
              dropDownMaxHeight={350}
              customArrowUp={arrowUp}
              customArrowDown={arrowDown}
              onChangeItem={item => { }}
            />

            :
            <View style={[s.listPicker, s.mt15, s.mh15]}>
              <TouchableOpacity style={[s.center, s.h46, s.flexRow, s.spaceBtw, s.aCenter]}
                activeOpacity={0.8}
                onPress={() => setList(!list)}
              >
                <View style={[s.btn40]} />
                <Text style={[s.text16, s.factor, s.textBlack, s.mh15]}>{activeTerm.label} </Text>
                <View style={[s.btn40, s.center]}>
                  <SvgUri width="16" height="16"
                    source={require('../../../assets/images/down.svg')} />
                </View>

              </TouchableOpacity>
              {
                list
                  ?
                  terms.map((term, index) => {
                    return (
                      <TouchableOpacity key={index} style={[s.listItem, s.center, s.h46]}
                        activeOpacity={0.8}
                        onPress={() => {
                          setActiveTerm(term)
                          setList(false)
                        }}
                      >
                        <Text style={[s.text16, s.factor, s.textBlack, s.mh15]}>{term.label} </Text>
                      </TouchableOpacity>
                    )
                  })
                  : null
              }

            </View>
        }

        <View style={[s.flexRow, s.mt15, s.mb5]}>
          <View style={[s.flex1]} />

          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
            onPress={() => props.onBack()}
          >
            <Text style={[s.text16, s.factor, s.textBlack, s.mh15]}>{text[lang].cancel} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.center, s.h40]}
            activeOpacity={0.8}
            onPress={() => props.onBack()}
          >
            <Text style={[s.text16, s.factor, s.textOrange, s.mh15]}>{text[lang].save} </Text>
          </TouchableOpacity>

        </View>

      </View>
    </TouchableOpacity >
  );
}
