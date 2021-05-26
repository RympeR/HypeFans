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


import BlogModal from '../blog/BlogModal'
import UserSettings from './UserSettings'
import DonutModal from './DonutModal'


export default function Screen(props) {

  let lang = props.lang
  let navigation = props.navigation
  const { user } = props.route.params;
  //let user = { nick: '@niikkirose ', name: 'Nikki Rose', ava: require('../../../assets/images/avaA.png'), photo: require('../../../assets/images/photo8.png') }

  let [bio, setBio] = React.useState(false)
  let [userSettings, setUserSettings] = React.useState(false)
  let [blogModal, setBlogModal] = React.useState(false)
  let [donutModal, setDonutModal] = React.useState(false)
  let [post, setPost] = React.useState(null)
  let [subscribe, setSubscribe] = React.useState(false)


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
  let baseH = 400
  let baseHmin = 160
  const H_MAX_HEIGHT = longIos ? (baseH + 20) : (platform ? baseH : (baseH + 10));
  const H_MIN_HEIGHT = longIos ? (baseHmin + 30) : baseHmin;
  const H_SCROLL_DISTANCE = H_MAX_HEIGHT - H_MIN_HEIGHT;
  const d = 280

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

  const avaTop_Min = -55
  const avaTop_Max = 45
  const avaTop = scrollOffsetY.interpolate({
    inputRange: [0, H_SCROLL_DISTANCE],
    outputRange: [avaTop_Max, avaTop_Min],
    extrapolate: "clamp"
  });

  // ----------------------------------------------------------------------



  return (
    <View style={[s.container, s.backColor]}>

      {/* animated header */}
      <Animated.View
        style={[s.animHeader, s.mb40, s.pabsolute, s.backColor,
        { height: headerScrollHeight }]}
      >
        <View style={[s.backgroundImage, s.pabsolute]}>
          <Animated.Image
            style={[s.backgroundImage, { height: backgroundImageH, opacity: backgroundImageOpacity }]}
            source={user.photo}
          />
        </View>

        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin, s.mb15]}>

          <Animated.View style={[s.pabsolute, s.center, { top: 14, left: 55, opacity: invertedOpacity }]}>
            <Image
              style={[s.image50r]}
              source={user.ava}
            />
            <View style={[s.userStatus1, s.pabsolute, {
              // online?
              backgroundColor: true ? '#37CE63' : '#ddd'
            }]} />
          </Animated.View>


          <TouchableOpacity style={[s.btn50, s.center, s.mt25]}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Animated.View style={[s.pabsolute, { opacity: backgroundImageOpacity }]}>
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/backW.svg')} />
            </Animated.View>
            <Animated.View style={[s.pabsolute, { opacity: invertedOpacity }]}>
              <SvgUri width="16" height="16"
                source={require('../../../assets/images/back.svg')} />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={[s.btn50, s.center, s.mt15]}
            activeOpacity={0.6}
            onPress={() => setUserSettings(true)}
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



        <View style={[s.animatedView, s.flex1]}>
          <Animated.View style={[s.avaWrap, s.center, { top: avaTop, opacity: storyOpacity }]}>
            { // story?
              true ? <ProfileGradient opac={storyOpacity} style={[s.pabsolute]} /> : null
            }

            <Animated.Image
              style={[s.profileAva, { opacity: storyOpacity }]}
              source={user.ava}
            />
            <Animated.View style={[s.userStatus, s.pabsolute, {
              // online?
              backgroundColor: true ? '#37CE63' : '#ddd'
            }]} />
          </Animated.View>

          <Animated.View style={[s.nameBar, s.center, s.mt5, {
            opacity: storyOpacity,
            top: avaTop,
          }]}>
            <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15]}>{user.name}</Text>
            <Text style={[s.text18, s.factor, s.textGrey]}>{user.nick}</Text>
            <Text style={[s.text14, s.factor, s.textBlack, s.mt5]}>{'2 posts' + `  ` + '365 fans'}</Text>
          </Animated.View>

          <Animated.View style={[s.nameTop, s.pabsolute, s.mh15, {
            opacity: invertedOpacity,
            left: 105,
            top: -45,
          }]}>
            <Text style={[s.text14, s.factorBold, s.textBlack]}>{user.name}</Text>
            <Text style={[s.text14, s.factor, s.textGrey, s.mt5]}>{user.nick}</Text>
          </Animated.View>
        </View>

        {/* shadyRound */}
        <Animated.View style={[s.sideButtons, s.pabsolute,
        { opacity: storyOpacity, right: 15, top: 160 }]}>

          <TouchableOpacity style={[s.sideBtn, s.btn50, s.center, s.mt15]}
            activeOpacity={0.9}
          //onPress={() => setDrawer(true)}
          >
            <Image
              style={[s.pabsolute, { top: 1, height: 70, width: 70, resizeMode: 'contain' }]}
              source={require('../../../assets/images/shadyRound.png')}
            />
            <View style={{ left: 1 }}>
              <SvgUri width="26" height="26"
                source={require('../../../assets/images/share.svg')} />
            </View>

          </TouchableOpacity>
          { // card added?
            true
              ?
              <View>
                <TouchableOpacity style={[s.sideBtn, s.btn50, s.center, s.mt20]}
                  activeOpacity={0.7}
                  onPress={() => setDonutModal(true)}
                >
                  <Image
                    style={[s.pabsolute, { top: 1, height: 70, width: 70, resizeMode: 'contain' }]}
                    source={require('../../../assets/images/shadyRound.png')}
                  />
                  <View style={{ left: 1 }}>
                    <SvgUri width="26" height="26"
                      source={require('../../../assets/images/usd.svg')} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[s.sideBtn, s.btn50, s.center, s.mt20]}
                  activeOpacity={0.7}
                  //onPress={() => props.onPage({page: 'Chat', route: 'ChatModule', user: user})}
                  onPress={() => navigation.navigate('ChatModule', { user: user })}
                >
                  <Image
                    style={[s.pabsolute, { top: 1, height: 70, width: 70, resizeMode: 'contain' }]}
                    source={require('../../../assets/images/shadyRound.png')}
                  />
                  <View style={{ left: 1 }}>
                    <SvgUri width="26" height="26"
                      source={require('../../../assets/images/message-square.svg')} />
                  </View>
                </TouchableOpacity>
              </View>
              : null
          }


        </Animated.View>

        {/* --- Static bottom --- */}
        <View style={[s.mt15]}>
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
        </View>
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
              ? <Text style={[s.text14, s.factor, s.textLine21, s.textBlack, s.mh15]}>{
                '(Bio) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              }</Text>
              : null
          }

          <View style={[s.pinkBack]}>
            { // card connected?
              true
                ?
                <View style={[s.pinkBack]}>
                  {
                    !subscribe && <View>
                      <Text style={[s.text14, s.factor, s.textGrey, s.textCenter, s.mt15]}>{text[lang].monSub}</Text>
                      <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15]}
                        activeOpacity={0.9}
                        onPress={() => setSubscribe(true)}
                      >
                        <Text style={[s.text18, s.factorBold]}>{text[lang].subFor + '$10'}</Text>
                      </TouchableOpacity>

                      <Text style={[s.text14, s.factor, s.textGrey, s.textCenter, s.mt15]}>{text[lang].or}</Text>
                    </View>
                  }
                  <TouchableOpacity style={[s.orangeBtn, s.center, s.mt15, s.mb15]}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('ChatModule', { user: user })}
                  >
                    <Text style={[s.text18, s.factorBold]}>{text[lang].sareFor + '$2'}</Text>
                  </TouchableOpacity>
                </View>
                :
                <View style={[s.pinkBack]}>
                  <Text style={[s.text14, s.factor, s.textGrey, s.textCenter, s.mt15]}>{text[lang].monSub}</Text>
                  <TouchableOpacity style={[s.disableBtn, s.center, s.mt15]}
                    activeOpacity={1}
                  //onPress={() => props.onSkip()}
                  >
                    <Text style={[s.text18, s.factorBold]}>{text[lang].subFor + '$10'}</Text>
                  </TouchableOpacity>

                  <Text style={[s.text14, s.factor, s.textGrey, s.textCenter, s.mt15]}>{text[lang].or}</Text>
                  <TouchableOpacity style={[s.disableBtn, s.center, s.mt15]}
                    activeOpacity={1}
                  //onPress={() => props.onSkip()}
                  >
                    <Text style={[s.text18, s.factorBold]}>{text[lang].sareFor + '$2'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[s.center, s.h56]}
                    activeOpacity={0.8}
                    onPress={() => props.onPage({ page: 'Profile', route: 'CardAdd' })}
                  >
                    <Text style={[s.text18, s.factorBold, s.textOrange]}>{text[lang].addCard2}</Text>
                  </TouchableOpacity>
                </View>
            }



          </View>



          {/* --- Posts ---  */}
          {
            posts.map((post, index) => {

              let [full, setFull] = React.useState(false)
              let [like, setLike] = React.useState(false)
              let [likeCount, setLikeCount] = React.useState(post.liks)
              let [lines, setLines] = React.useState(null)

              const [show, setShow] = React.useState(false);
              const [status, setStatus] = React.useState({});
              const video = React.useRef(null);


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
                    source={post.video}
                    blurRadius={subscribe ? 0 : 10}
                  >
                    {
                      subscribe
                        ?
                        <TouchableOpacity style={[s.videoView, s.center, s.mt8]}
                          activeOpacity={1}
                        //onPress={() => setShow(true)}
                        >
                          <SvgUri width="50" height="50"
                            source={require('../../../assets/images/play.svg')} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[s.orangeBtn, s.center, s.mb15, { top: '35%' }]}
                          activeOpacity={0.9}
                          onPress={() => setSubscribe(true)}
                        >
                          <Text style={[width < 300 ? s.text17 : s.text18, s.factorBold]}>{text[lang].subscribe}</Text>
                        </TouchableOpacity>
                    }
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

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={userSettings}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setUserSettings(false)}
      >
        <UserSettings
          lang={lang}
          onBack={() => setUserSettings(false)}
          post={post}
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
        <BlogModal
          lang={lang}
          onBack={() => setBlogModal(false)}
          post={post}
        />
      </RnModal>

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={donutModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        scrollOffset={100}
        swipeDirection={'down'}
        onSwipeComplete={() => setDonutModal(false)}
      >
        <DonutModal
          lang={lang}
          onBack={() => setDonutModal(false)}
          user={user}
        />
      </RnModal>
    </View >
  );
}
