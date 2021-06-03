import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
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

import TopGradient from '../../../components/TopGradient'
import ProfileGradient from '../../../components/ProfileGradient'

let platform = Platform.OS === 'ios' ? true : false
let longIos = height / width > 2 && Platform.OS === 'ios'

import { LinearGradient } from 'expo-linear-gradient';
import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';


import Drawer from './Drawer'
import ExitModal from './ExitModal'
import BlogSettings from './BlogSettings'


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation;
  let apiProfile = props.apiProfile;

  let [bio, setBio] = React.useState(false)
  let [drawer, setDrawer] = React.useState(false)
  let [exitModal, setExitModal] = React.useState(false)
  let [blogModal, setBlogModal] = React.useState(false)
  let [post, setPost] = React.useState(null)

  let user = { nick: '@niikkirose ', name: 'Nikki Rose', ava: require('../../../assets/images/avaA.jpg'), photo: require('../../../assets/images/photo8.png') }

  let group = user
  let posts = [
    {
      group: group, time: '12 часов назад', text: 'Сделайте 5-минутный перерыв на растяжку со мной, пока я демонстрирую некоторые базовые движения для гибкости и расслабления, пока я демонстрирую некоторые базовые движения для гибкости и расслабления',
      liks: 74, comments: 36, video: require('../../../assets/images/preview6.png'),
    },
    {
      group: group, time: 'Вчера', text: 'Flip into action with pro skateboarder @officialdanimal 🤘 He’s here to wow you with his craziest skills and teach you how to freestyle it',
      liks: 154, comments: 98, video: require('../../../assets/images/preview4.png'),
    },
    {
      group: group, time: 'Март, 21', text: 'Ya’ll ain’t ready for this! It’s @rampage_jackson 👊💥 It’s going to be a knockout as the former champ is inviting you to the Rampage show',
      liks: 140, comments: 70, video: require('../../../assets/images/preview5.png'),
    },
  ]

  let scrolls = React.useRef();
  // Animation ----------------------------------------------------------
  let baseH = 370
  let baseHmin = 155
  const H_MAX_HEIGHT = longIos ? (baseH + 20) : (platform ? baseH : (baseH + 10));
  const H_MIN_HEIGHT = longIos ? (baseHmin + 30) : baseHmin;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;

  const scrollOffsetY = useRef(new Animated.Value(0)).current;


  const headerScrollHeight = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [H_MAX_HEIGHT, H_MIN_HEIGHT],
    extrapolate: "clamp"
  });

  const backgroundImageH_Min = 50 // 50
  const backgroundImageH_Max = 200
  const backgroundImageH = scrollOffsetY.interpolate({
    inputRange: [0, backgroundImageH_Max], // H_SCROLL_DISTANCE
    outputRange: [backgroundImageH_Max, backgroundImageH_Min],
    extrapolate: "clamp"
  });
  const backgroundImageOpacity = scrollOffsetY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });
  const invertedOpacity = scrollOffsetY.interpolate({
    inputRange: [200, 250],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const storyOpacity = scrollOffsetY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  const avaImageH_Min = 50 // 50
  const avaImageH_Max = 120
  const avaImageH = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaImageH_Max, avaImageH_Min],
    extrapolate: "clamp"
  });
  const avaRadius_Min = 25
  const avaRadius_Max = 60
  const avaRadius = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaRadius_Max, avaRadius_Min],
    extrapolate: "clamp"
  });
  const avaWrapH = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaImageH_Max + 8, avaImageH_Min + 8],
    extrapolate: "clamp"
  });
  const avaTop_Min = -55
  const avaTop_Max = 45
  const avaTop = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaTop_Max, avaTop_Min],
    extrapolate: "clamp"
  });
  const avaLeft_Min = 15
  const avaLeft_Max = (width - 128) * 0.5
  const avaLeft = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaLeft_Max, avaLeft_Min],
    extrapolate: "clamp"
  });

  // ----------------------------------------------------------------------

  console.log("profile\profile.ks token"+apiProfile.token);


  return (
    <View style={[s.container, s.backColor]}>

      {/* animated header */}
      <Animated.View
        style={[s.animHeader, s.mb40, s.pabsolute, s.backColor,
        { height: headerScrollHeight }]}
      >
        {/* main image */}
        <View style={[s.backgroundImage, s.pabsolute]}>
          <Animated.Image
            style={[s.backgroundImage, { height: backgroundImageH, opacity: backgroundImageOpacity }]}
            source={user.photo}
          />
        </View>

        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin, s.mb15]}>

          <Animated.Image
            style={[s.image50r, s.pabsolute, {
              top: 14,
              left: 15,
              opacity: invertedOpacity,
            }]}
            source={user.ava}
          />
          
          {/* fans , posts */}
          <Animated.View style={[s.countBar, s.flexRow, s.h50, s.mt15, { opacity: backgroundImageOpacity }]}>
            <Text style={[s.text14, s.factor, s.textWhite, s.mh15]}>{'2 posts'}</Text>
            <Text style={[s.text14, s.factor, s.textWhite]}>{'365 fans'}</Text>
          </Animated.View>

          {/* submenu ... top-left -> setDrawer */}
          <TouchableOpacity style={[s.btn50, s.center, s.mt15]}
            activeOpacity={0.6}
            onPress={() => setDrawer(true)}
          >
            
            <Animated.View style={[s.pabsolute, { opacity: backgroundImageOpacity }]}>
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/3dotsW.svg')} />
            </Animated.View>
            <Animated.View style={[s.pabsolute, { opacity: invertedOpacity }]}>
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/3dots.svg')} />
            </Animated.View>
          </TouchableOpacity>
        </View>


        {/* main image, round image, name, @name  */}
        <View style={[s.animatedView, s.flex1]}>
          <Animated.View style={[s.avaWrap, s.center, { top: avaTop, opacity: storyOpacity }]}>
            {true ? <ProfileGradient opac={storyOpacity} style={[s.pabsolute]} /> : null}
            <Animated.Image
              style={[s.profileAva, { opacity: storyOpacity }]}
              source={user.ava}
            />
          </Animated.View>


          <Animated.View style={[s.nameBar, s.center, s.mt5, { opacity: storyOpacity, top: avaTop }]}>
            <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15]}>{user.name}</Text>
            <Text style={[s.text18, s.factor, s.textGrey]}>{user.nick}</Text>
          </Animated.View>

          <Animated.View style={[s.nameTop, s.center, s.pabsolute, {
            opacity: invertedOpacity,
            left: 70,
            top: -45,
          }]}>
            <Text style={[s.text14, s.factorBold, s.textBlack, s.mh15]}>{user.name}</Text>
            <Text style={[s.text14, s.factor, s.textGrey, s.mt5]}>{user.nick}</Text>
          </Animated.View>
        </View>


        {/* --- Static bottom --- */}
        <Animated.View style={[s.mt15, {
          //opacity: storyOpacity,
          //height: 
        }]}>

          <Text numberOfLines={1} style={[s.hobby, s.text14, s.factor, s.textBlack, s.mh15]}>{'Modeling | Travel | Skin | Daily Routines...'}</Text>


          <TouchableOpacity style={[s.h25, s.jCenter, s.mb15]}
            activeOpacity={0.6}
            onPress={() => {
              !bio && scrolls.current?.scrollTo({ x: 0, y: 0, animated: true })
              setBio(!bio)
            }}
          >
            {
              bio
                ? <Text style={[s.text14, s.factor, s.textOrange, s.mh15]}>{text[lang].hide}</Text>
                : <Text style={[s.text14, s.factor, s.textOrange, s.mh15]}>{text[lang].redmor}</Text>
            }
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <ScrollView style={[]}
        ref={scrolls}
        showsVerticalScrollIndicator={false}

        onScroll={
          Animated.event([
            { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
          ],
            { useNativeDriver: false })}
        scrollEventThrottle={16}
      >

        <View style={[{
          paddingTop: H_MAX_HEIGHT
        }]}>

          {
            bio
              ? <Text style={[s.text14, s.factor, s.textLine21, s.textBlack, s.mh15, s.mb15]}>{
                '(Bio)Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              }</Text>
              : null
          }


          {/* button edit profile */}

          <TouchableOpacity style={[s.orangeBtn, s.center]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('ProfileEdit')}
          >
            <Text style={[s.text18, s.factorBold]}>{text[lang].editProfile}</Text>
          </TouchableOpacity>

          {/* --- Posts ---  */}
          {
            posts.map((post, index) => {


              let [full, setFull] = React.useState(false)
              let [like, setLike] = React.useState(false)
              let [likeCount, setLikeCount] = React.useState(post.liks)

              let [lines, setLines] = React.useState(null)


              return (
                <View key={index} style={[s.post, s.mt25]}>

                  <View style={[s.groupView, s.flexRow, s.spaceBtw, s.aCenter, s.ml15]}>
                    <View style={[s.flexRow, s.aCenter]}>
                      <Image
                        style={[s.image50r, s.mr10]}
                        source={group.ava}
                      />
                      <View style={[]}>
                        <Text style={[s.text14, s.factorBold, s.textBlack, s.mt3]}>{group.name}</Text>
                        <Text style={[s.text14, s.factor, s.textGrey2, s.mt3]}>{group.nick}</Text>
                      </View>
                    </View>

                    <View style={[s.flexRow, s.aCenter]}>
                      <Text style={[s.text14, s.factor, s.textGrey2]}>{post.time}</Text>
                      <TouchableOpacity style={[s.btn40, s.center]}
                        activeOpacity={0.8}
                        onPress={(post) => {
                          setBlogModal(true)
                          setPost(post)
                        }}
                      >
                        <SvgUri width="5" height="15"
                          source={require('../../../assets/images/3dots.svg')} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity style={[s.textView, s.mh15, s.mt15]}
                    activeOpacity={1}
                    onPress={() => setFull(!full)}
                  >
                    <Text numberOfLines={full ? null : 3} style={[s.text14, s.textLine21, s.factor, s.textBlack]}
                      onTextLayout={({ nativeEvent: { lines } }) => {
                        setLines(lines.length)
                      }}
                    >{post.text}</Text>
                    {
                      full
                        ?
                        null
                        : <View style={[]}>
                          {
                            lines > 3
                              ? <Text style={[s.h15, s.text14, s.factor, s.textOrange]}>{text[lang].redmor}</Text>
                              : null
                          }
                        </View>
                    }
                  </TouchableOpacity>

                  <ImageBackground style={[s.videoView, s.jCenter, s.mt8]}
                    source={post.video} >
                    <TouchableOpacity style={[s.videoView, s.center, s.mt8]}
                      activeOpacity={1}
                    //onPress={() => setShow(true)}
                    >
                      {/* <SvgUri width="50" height="50"
                        source={require('../../../assets/images/play.svg')} /> */}
                    </TouchableOpacity>
                  </ImageBackground>

                  <View style={[s.bottomBtns, s.flexRow, s.spaceBtw, s.aCenter, s.mh10]}>
                    <View style={[s.flexRow, s.aCenter]}>
                      <TouchableOpacity style={[s.h40, s.center, s.ph5]}
                        activeOpacity={0.8}
                        onPress={() => {
                          setLike(!like)
                          like ? setLikeCount(likeCount - 1) : setLikeCount(likeCount + 1)
                        }}
                      >
                        {
                          like
                            ?
                            <SvgUri width="21" height="18"
                              source={require('../../../assets/images/liked.svg')} />
                            :
                            <SvgUri width="21" height="18"
                              source={require('../../../assets/images/heart.svg')} />
                        }

                      </TouchableOpacity>
                      <TouchableOpacity style={[s.h40, s.center, s.ph5]}
                        activeOpacity={0.8}
                        onPress={() => console.log('comment')}
                      >
                        <SvgUri width="18" height="18"
                          source={require('../../../assets/images/comment.svg')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[s.h40, s.center]}
                        activeOpacity={0.8}
                      //onPress={() => setSearch(!search)}
                      >
                        <Text style={[s.text14, s.factor, s.textGrey2, s.ph5]}>{text[lang].donut}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[s.h40, s.center, s.ph5]}
                      activeOpacity={0.8}
                    //onPress={() => setSearch(!search)}
                    >
                      <SvgUri width="18" height="18"
                        source={require('../../../assets/images/bookmark.svg')} />
                    </TouchableOpacity>
                  </View>

                  <Text style={[s.text14, s.factor, s.textBlack, s.mh15]}>{likeCount + text[lang].liks1}</Text>

                  <TouchableOpacity style={[s.h25, s.jCenter, s.mb25]}
                    activeOpacity={0.8}
                  //onPress={() => setSearch(!search)}
                  >
                    <Text style={[s.text14, s.factor, s.textGrey2, s.mh15,]}>
                      {text[lang].watch + post.comments + text[lang].comments1}
                    </Text>
                  </TouchableOpacity>


                </View>
              )
            })
          }

          <View style={{ height: 60 }} />
        </View>
      </ScrollView>



     {/* modal menu ... top-left */}
      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={drawer}
        onBackButtonPress={() => setDrawer(false)}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        scrollOffset={100}
        swipeDirection={'right'}
        onSwipeComplete={() => setDrawer(false)}
      >
        {/* Drawer.js component */}
        <Drawer
          lang={lang}
          onBack={() => setDrawer(false)}
          navigation={navigation}
          user={user}
          onExit={() => { setDrawer(false); setExitModal(true) }}
        />
      </RnModal>

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={exitModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setExitModal(false)}
      >
        <ExitModal
          lang={lang}
          onBack={() => setExitModal(false)}
          onExit={() => props.onExit()}
        />
      </RnModal>

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={blogModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setBlogModal(false)}
      >
        <BlogSettings
          lang={lang}
          onBack={() => setBlogModal(false)}
          post={post}
        />
      </RnModal>
    </View >
  );
}
