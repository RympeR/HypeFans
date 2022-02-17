import React, { useState, useEffect } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  Dimensions,
  BackHandler
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import AvaGradient from '../../../components/AvaGradient'

export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation

  let users = props.users

  let [name, setName] = useState(text[lang].noname)
  //let [groupImg, setGroupImg] = useState(require('../../../assets/images/ava5.png'))
  let [groupImg, setGroupImg] = useState(null)
  let [group, setGroup] = React.useState([])
  let [switch1, setSwitch1] = useState(false);
  let [incorrect, setIncorrect] = React.useState(false)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setGroupImg(result.uri);
    }
  };


  return (
    <View style={[s.container, s.backColor]}>

      <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <SvgUri width="16" height="16"
            source={require('../../../assets/images/back.svg')} />
        </TouchableOpacity>
        <Text style={[s.text24, s.factorBold, s.textBlack]}>{text[lang].createChat}</Text>

        <TouchableOpacity style={[s.btn50, s.center]}
          activeOpacity={0.8}
        //onPress={() => navigation.navigate('NoteSettings')}
        >
          {/* <SvgUri width="30" height="30"
            source={require('../../../assets/images/settings.svg')} /> */}
        </TouchableOpacity>
      </View>

      <View style={[s.chatNameBar, s.flexRow, s.aCenter, s.mh15]}>
        <TouchableOpacity style={[s.center, { width: 80, height: 80 }]}
          activeOpacity={0.8}
          onPress={pickImage}
        >
          { // groupImage?
            groupImg
              ?  <Image source={[{ uri: groupImg }]} style={[s.groupImage]} />
              : <View style={[s.center, { width: 80, height: 80 }]}>
                <AvaGradient style={[]} />
                <View style={[s.pabsolute, s.center]}>
                  <SvgUri width="30" height="30"
                    source={require('../../../assets/images/camera1.svg')} />
                </View>
              </View>
          }

        </TouchableOpacity>

        <View style={[s.nameInputBar, s.flex1, s.ml15]}>
          <TextInput
            style={[s.input, s.text14, s.factor, s.textBlack, s.h46]}
            placeholder={text[lang].chatPls}
            placeholderTextColor={'#aaa'}
            onChangeText={(txt)=>setName(txt)}
          />
          <View style={[s.greyLine]} />
        </View>
      </View>



      <TouchableOpacity style={[s.h53, s.aCenter, s.flexRow, s.spaceBtw, s.ml15]}
        activeOpacity={0.8}
        onPress={() => setSwitch1(!switch1)}
      >
        <Text style={[s.text18, s.factor, s.textBlack]}>{text[lang].enterPrice}</Text>
        <View style={[s.mh15]}>
          <Switch
            trackColor={{ false: "#ddd", true: "#FF6644" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#ddd"
            onValueChange={() => setSwitch1(!switch1)}
            value={switch1}
          />
        </View>
      </TouchableOpacity>

      { switch1
        ?
        <View style={[]}>
          <View style={[s.inputBlock, s.mh15, s.flexRow, s.spaceBtw, s.alignCenter,
          { borderColor: incorrect ? '#f52424' : '#aaa' }
          ]}>
            <Text style={[s.text14, s.factor, s.textBlack, s.ml15]}>{'$ '}</Text>
            <TextInput
              autoFocus={true}
              keyboardType={'numeric'}
              style={[s.input, s.text14, s.factor, s.flex1, s.h46,
              incorrect ? s.textRed : s.textBlack]}
              placeholder={text[lang].enterSumm}
              placeholderTextColor={'#999'}
            />
          </View>
        </View>
        :
        <View style={[]}>
          <View style={[s.inputBlock, s.mh15, s.flexRow, s.aCenter, { borderColor: '#ddd' }
          ]}>
            <Text style={[s.text14, s.factor, s.textBlack, s.ml15, { color: '#ddd' }]}>{'$ '}</Text>
            <Text style={[s.text14, s.factor, { color: '#ddd' }]}>{text[lang].enterSumm}</Text>
          </View>
        </View>
      }

      <View style={[s.mb10]} />

      <ScrollView style={[]} showsVerticalScrollIndicator={false}>

        {
          users.map((user, index) => {
            let [check, setCheck] = useState(false)
            return (
              <View key={index} style={[check ? s.pinkBack : null]}>
                <TouchableOpacity style={[s.flexRow, s.aCenter, s.spaceBtw, s.mt10, s.mh15]}
                  activeOpacity={0.7}
                  onPress={() => {

                    let arr = group
                    if (check) {
                      let index = arr.indexOf(user);
                      if (index > -1) {
                        arr.splice(index, 1);
                      }
                    } else arr.push(user)
                    setGroup(arr)
                    setCheck(!check)
                    //console.log(group.length)
                  }}
                >
                  <View style={[s.flexRow, s.spaceBtw, s.aCenter]}>
                    <TouchableOpacity style={[]}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('UserPage', { user: user })}
                    >
                      <Image
                        style={[s.image50r, s.mr10]}
                        source={user.ava}
                      />
                    </TouchableOpacity>
                    <View style={[]}>
                      <View style={[]}>
                        <Text style={[s.text14, s.factorBold, s.textBlack]}>{user.name}</Text>
                        <Text style={[s.text14, s.factor, s.textGrey, s.mt5]}>{user.nick}</Text>
                      </View>
                    </View>
                  </View>

                  {
                    check
                      ?
                      <View style={[s.checked, s.center]}>
                        <LinearGradient
                          style={[s.checkGradient]}
                          colors={['#FF6644', '#FF485C']}
                          start={[0, 0]} end={[0, 1]}
                        />
                      </View>
                      : <View style={[s.checkBox]} />
                  }

                </TouchableOpacity>
                <View style={[s.greyLine, s.mt10, s.mh15]} />
              </View>
            )
          })}


      </ScrollView>

      {group.length > 0
        ?
        <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15, s.mb60, s.pabsolute,
           {width: width-30, bottom: 0 }]}
          activeOpacity={1}
          onPress={() => navigation.navigate('ChatGroup', {group: group, name: name, image: groupImg})}
        >
          <Text style={[s.text18, s.factorBold]}>{text[lang].sendInvit}</Text>
        </TouchableOpacity>
        : null
      }

    </View >
  );
}
