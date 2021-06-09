import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  Button,
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
  Modal,
  View,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get("screen")

import s from '../../../styles/style'
import text from '../../../assets/text/text'

import TopGradient from '../../../components/TopGradient'
import AvaGradient from '../../../components/AvaGradient'

import BlogModal from './BlogModal'
import GLOBAL from '../../../globals.js'
import ApiBlog from '../../../components/api/blog/ApiBlog';
let platform = Platform.OS === 'ios' ? true : false

import SvgUri from "expo-svg-uri"
import RnModal from 'react-native-modal';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Screen(props) {

  let lang = props.lang
  let users = props.users
  let navigation = props.navigation

  let profile = GLOBAL.profile;
  let blog = ApiBlog(profile);
  let posts = blog.mainPageGet();
  let [search, setSearch] = React.useState(false)
  let [blogModal, setBlogModal] = React.useState(false)
  let [post, setPost] = React.useState(null)
  let [item, setItem] = React.useState(0)


  let group = { username: '@hypefans', avatar: require('../../../assets/images/ava5.png'), first_name: 'HypeFans' }
  let posts = [
    {
      group: group, author: users[0], publication_date: '20 мин назад', text: 'Перчатки сняты, поскольку чемпион по боксу @TonyBellew присоединился к нам на HypeFans 🥊 Он предлагает возможность присоединиться, поскольку чемпион по боксу @TonyBellew присоединился к нам на HypeFans 🥊 Он предлагает возможность присоединиться.',
      likes_amount: 88, comments_amount: 21, video: require('../../../assets/images/preview1.png'),
    },
    {
      group: group, author: users[1], publication_date: '5 часов назад', text: 'Присоединяйтесь к @desiree, когда она готовит один из своих любимых рецептов - вкусное куриное адобо! Подключайтесь к новым сериям когда она готовит один из своих любимых рецептов - вкусное куриное адобо!',
      likes_amount: 160, comments_amount: 56, video: require('../../../assets/images/preview2.png'),
    },
    {
      group: group, author: users[2], publication_date: '12 часов назад', text: 'Prepare for takeoff as @rebecca_aviatrix is flying you to higher altitudes on HypeFans ✈️ The pilot is taking you on her aviation journey where you can. Prepare for takeoff as @rebecca_aviatrix is flying you to higher altitudes on HypeFans ✈️ The pilot is taking you on her aviation journey where you can.',
      likes_amount: 74, comments_amount: 36, video: require('../../../assets/images/preview3.png'),
    },
    {
      group: group, author: users[6], publication_date: 'Вчера', text: 'Flip into action with pro skateboarder @officialdanimal 🤘 He’s here to wow you with his craziest skills and teach you how to freestyle it',
      likes_amount: 154, comments_amount: 98, video: require('../../../assets/images/preview4.png'),
    },
    {
      group: group, author: users[7], publication_date: 'Март, 21', text: 'Ya’ll ain’t ready for this! It’s @rampage_jackson 👊💥 It’s going to be a knockout as the former champ is inviting you to the Rampage show',
      likes_amount: 140, comments_amount: 70, video: require('../../../assets/images/preview5.png'),
    },
  ]

  // Carousel data
  let cData = []
  let arr = []
  users.map((user, index) => {

    arr.push(user)
    if (index % 3 == 2) {
      cData.push(arr)
      arr = []
    }
    if (index == users.length - 1) {
      cData.push(arr)
    }
  })



  let _renderItem = ({ item, index0 }) => {
    return (
      item.map((user, index1) => {
        return (
          <TouchableOpacity key={index1} style={[s.photoView, s.center, s.mb5]}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('UserPage', { user: user })}
          >

            <Image style={[s.photoViewAlso, s.pabsolute]}
              source={user.photo} />

            <View style={[s.flexRow]}>
              <View style={[s.autorView, s.flexRow, s.aCenter, s.ml30]}>
                <Image
                  style={[s.image50r, s.mr10]}
                  source={user.avatar}
                />
                <View style={[]}>
                  <Text numberOfLines={1} style={[s.text14, s.factorBold, s.textBlack, s.mt3]}>{user.first_name}</Text>
                  <Text numberOfLines={1} style={[s.text14, s.factor, s.textGrey2, s.mt3]}>{user.username}</Text>
                </View>
              </View>
              <View style={[s.flex1]} />
            </View>

            {
              index1 % 2 == 0
                ?
                <View style={[s.freeView, s.center, s.mh15, s.pabsolute, { top: 10, right: 15 }]}>
                  <Text style={[s.text12, s.factorBold]}>{text[lang].free}</Text>
                </View>
                : null
            }
          </TouchableOpacity>
        )
      })
    )

  }

  {/* --- Carousel ---  */ }
  let _also = () => {
    return (
      < View style={[s.carouselView, s.mt25]} >
        <Text style={[s.text18, s.factorBold, s.textBlack, s.mh15, s.mt15, s.mb15]}>{text[lang].also}</Text>
        <Carousel
          data={cData}
          //data={carouselData}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => { setItem(index) }}
          autoplay={false}
          //autoplayDelay={1000}
          //autoplayInterval={3000}
          loop={true}
        />
        <Pagination
          dotsLength={cData.length}
          activeDotIndex={item}
          dotStyle={s.carouselDot}
          inactiveDotOpacity={0.2}
          inactiveDotScale={0.7}
        />
      </View >

    )
  }

  let _stopPlayer = () => {
    //console.log(AVPlaybackStatus)
  }
  const scrollOffsetY = useRef(new Animated.Value(0)).current;



  return (
    <View style={[s.container, s.backColor]}>

      {search
        ?
        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin, s.greyBottom]}>
          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
            onPress={() => setSearch(false)}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/x.svg')} />
          </TouchableOpacity>

          <TextInput
            // autoFocus={platform ? true : false}
            autoFocus={true}
            style={[s.text14, s.factor, s.textBlack, s.flex1, s.h46, platform ? s.mt3 : null]}
            placeholder={text[lang].search}
            placeholderTextColor={'#aaa'}
            // onFocus={() => platform ? null : props.setTab(false)}
            // onBlur={() => platform ? null : props.setTab(true)}
            onEndEditing={() => { setSearch(false) }}
          />

          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
            onPress={() => setSearch(!search)}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/search.svg')} />
          </TouchableOpacity>
        </View>
        :
        <View style={[s.topBar, s.flexRow, s.spaceBtw, s.aCenter, s.statBarMargin]}>
          <TouchableOpacity style={[s.h50, s.flexRow, s.center, s.ml15]}
            activeOpacity={0.8}
          //onPress={() => backAction()}
          >
            <Image
              style={[s.image32, s.mr10]}
              source={require('../../../assets/images/logo_transp.png')}
            />
            <Text style={[s.text18, s.factorBold, s.textBlack]}>{'HypeFans'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.btn50, s.center]}
            activeOpacity={0.8}
            onPress={() => setSearch(!search)}
          >
            <SvgUri width="24" height="24"
              source={require('../../../assets/images/search.svg')} />
          </TouchableOpacity>
        </View>
      }

      <TopGradient />



      {/* <KeyboardAvoidingView style={[]}
        behavior={platform ? "padding" : "height"}
      > */}
      <ScrollView style={[]} showsVerticalScrollIndicator={false}
        onScroll={() => _stopPlayer()}
        // onScroll={
        //   Animated.event([
        //     { nativeEvent: { contentOffset: { y: scrollOffsetY } } }
        //   ],
        //     { useNativeDriver: false })
        // }
        scrollEventThrottle={16}
      >

        {/* --- Stories ---  */}

        <ScrollView style={[s.flexRow, s.mt15]} horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[s.avatar, s.center, s.mr5, s.ml10]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Story')}
          >
            <View style={[s.userIcon, s.center]}>
              <Image
                style={[s.image60rw]}
                source={require('../../../assets/images/ava1.png')}
              />
            </View>
            <View style={[s.addBtn, s.pabsolute]}>
              <SvgUri width="20" height="20"
                source={require('../../../assets/images/add.svg')} />
            </View>
            <Text numberOfLines={1} style={[s.text14, s.factor, s.textGrey2, s.mt3]}>{text[lang].yrStory}</Text>
          </TouchableOpacity>

          {
            users.map((user, index) => {
              return (
                <TouchableOpacity key={index}
                  style={[s.avatar, s.center, s.mr5]}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('StoryViewer')}
                >
                  <View style={[s.personIcon, s.center]}>
                    <AvaGradient style={[s.pabsolute]} />
                    <View style={[s.whiteRound1, s.pabsolute]} />

                    <Image
                      style={[s.image60rw]}
                      source={user.avatar}
                    />
                  </View>
                  <Text numberOfLines={1} style={[s.text14, s.factor, s.textBlack, s.mt3]}>{user.username}</Text>
                </TouchableOpacity>

              )
            })
          }
        </ScrollView>

        {/* --- What you think ---  */}
        <View style={[s.flexRow, s.aCenter, s.mh15, s.mt25]}>

          <View style={[s.center, s.mr10]}>
            <Image
              style={[s.image50r]}
              source={require('../../../assets/images/ava1.png')}
            />
          </View>
          <TextInput
            style={[s.blogInput, s.text16, s.factor, s.textBlack, s.flex1, s.ph15]}
            placeholder={text[lang].urThought}
            placeholderTextColor={'#000'}
          // onFocus={() => platform ? null : props.setTab(false)}
          // onBlur={() => platform ? null : props.setTab(true)}
          //onEndEditing={() => { console.log('post') }}
          />
        </View>


        {/* --- Posts ---  */}
        {
          posts.map((post, index) => {

            let [full, setFull] = React.useState(false)
            let [like, setLike] = React.useState(false)
            let [likeCount, setLikeCount] = React.useState(post.likes_amount)
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
                      source={group.avatar}
                    />
                    <View style={[]}>
                      <Text style={[s.text14, s.factorBold, s.textBlack, s.mt3]}>{group.first_name}</Text>
                      <Text style={[s.text14, s.factor, s.textGrey2, s.mt3]}>{group.username}</Text>
                    </View>
                  </View>

                  <View style={[s.flexRow, s.aCenter]}>
                    <Text style={[s.text14, s.factor, s.textGrey2]}>{post.publication_date}</Text>
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

                <TouchableOpacity style={[s.userBar]}
                  activeOpacity={0.9}
                  onPress={() => { navigation.navigate('UserPage', { user: post.author }) }}
                >
                  <ImageBackground style={[s.photoView, s.jCenter, s.mt15]}
                    source={post.author.photo} >

                    <View style={[s.flexRow]}>
                      <View style={[s.autorView, s.flexRow, s.aCenter, s.mh15]}>
                        <Image
                          style={[s.image50r, s.mr10]}
                          source={post.author.avatar}
                        />
                        <View style={[]}>
                          <Text numberOfLines={1} style={[s.text14, s.factorBold, s.textBlack]}>{post.author.first_name}</Text>
                          <Text numberOfLines={1} style={[s.text14, s.factor, s.textGrey2, s.mt3]}>{post.author.username}</Text>
                        </View>
                      </View>
                      <View style={[s.flex1]} />
                    </View>

                    <View style={[s.freeView, s.center, s.mh15, s.pabsolute, { top: 5, right: 0 }]}>
                      <Text style={[s.text12, s.factorBold]}>{text[lang].free}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>

                {
                  show
                    ?
                    <TouchableOpacity style={[s.videoView, s.jCenter, s.mt8]}
                      activeOpacity={1}
                      onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
                    >
                      <Video
                        ref={video}
                        style={s.videoView}
                        source={{
                          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        useNativeControls
                        shouldPlay={true}
                        resizeMode="contain"
                        isLooping={false}
                        onPlaybackStatusUpdate={status => setStatus(() => status)}
                      />
                    </TouchableOpacity>
                    :
                    <ImageBackground style={[s.videoView, s.jCenter, s.mt8]}
                      source={post.video} >
                      <TouchableOpacity style={[s.videoView, s.center, s.mt8]}
                        activeOpacity={1}
                      //onPress={() => setShow(true)}
                      >
                        <SvgUri width="50" height="50"
                          source={require('../../../assets/images/play.svg')} />
                      </TouchableOpacity>
                    </ImageBackground>


                }


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
                    {text[lang].watch + post.comments_amount + text[lang].comments1}
                  </Text>
                </TouchableOpacity>

                {/* --- Carousel ---  */}
                { index == 2 || (posts.length == 1)
                  ? _also()
                  : null
                }

              </View>
            )
          })
        }

        <TouchableOpacity style={[s.h40, s.center, s.mb25]}
          activeOpacity={0.8}
        //onPress={() => setSearch(!search)}
        >
          <Text style={[s.text14, s.factor, s.textOrange, s.mh15]}>
            {text[lang].morePosts}
          </Text>
        </TouchableOpacity>



        <View style={{ height: 60 }} />

      </ScrollView>
      {/* </KeyboardAvoidingView > */}

      <RnModal
        style={{ margin: 0 }}
        coverScreen={false}
        isVisible={blogModal}
        onBackButtonPress={() => setBlogModal(false)}
        // animationIn={'slideInUp'}
        // animationOut={'slideOutDown'}
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


    </View >
  );
}
