'use strict';

var React = require('react-native');

const {
  StyleSheet,
} = React;

import { Dimensions, Platform, StatusBar } from 'react-native';
const { width, height } = Dimensions.get("screen")

//console.log( 'Screen size:', width, height )

import { getStatusBarHeight } from 'react-native-status-bar-height';
let statusBarHeight = getStatusBarHeight()
//let statusBarHeight = StatusBar.currentHeight
// console.log('statusBarHeight', statusBarHeight);

//const window = Dimensions.get('window').height


let platform = Platform.OS === 'ios'
let longIos = height / width > 2 && Platform.OS === 'ios'



module.exports = StyleSheet.create({

  testLine: {
    height: 1,
    width: width,
    backgroundColor: '#000',
    top: statusBarHeight,
  },

  container: {
    flex: 1,
  },
  blockView: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  test: {
    backgroundColor: '#555'
  },
  statBarMargin: {
    marginTop: statusBarHeight,
  },
  statusHeight: {
    height: statusBarHeight,
  },
  mh5: {
    marginHorizontal: 5,
  },
  mh10: {
    marginHorizontal: 10,
  },
  mh15: {
    marginHorizontal: 15,
  },
  mh20: {
    marginHorizontal: 20,
  },
  mh24: {
    marginHorizontal: 24,
  },
  mh30: {
    marginHorizontal: 30,
  },
  mh40: {
    marginHorizontal: 40,
  },
  mh48: {
    marginHorizontal: 48,
  },
  mt3: {
    marginTop: 3,
  },
  mt5: {
    marginTop: 5,
  },
  mt8: {
    marginTop: 8,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt25: {
    marginTop: 25,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },
  mt50: {
    marginTop: 50,
  },
  mb3: {
    marginBottom: 3,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  mb25: {
    marginBottom: 25,
  },
  mb30: {
    marginBottom: 30,
  },
  mb40: {
    marginBottom: 40,
  },
  mb50: {
    marginBottom: 50,
  },
  mb60: {
    marginBottom: 60,
  },
  mr5: {
    marginRight: 5,
  },
  mr8: {
    marginRight: 8,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr18: {
    marginRight: 18,
  },
  mr20: {
    marginRight: 20,
  },
  mr24: {
    marginRight: 24,
  },
  ml3: {
    marginLeft: 3,
  },
  ml5: {
    marginLeft: 5,
  },
  mr50: {
    marginRight: 50,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },
  ml25: {
    marginLeft: 25,
  },
  ml30: {
    marginLeft: 30,
  },
  ml50: {
    marginLeft: 50,
  },
  ip10mb: {
    marginBottom: longIos ? 30 : 20,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv20: {
    paddingVertical: 20,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb20: {
    paddingBottom: 20,
  },
  pb25: {
    paddingBottom: 25,
  },
  ph5: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  ph8: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  ph10: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  ph15: {
    paddingRight: 15,
    paddingLeft: 15,
  },
  ph20: {
    paddingRight: 20,
    paddingLeft: 20,
  },
  ph50: {
    paddingRight: 50,
    paddingLeft: 50,
  },
  pr0: {
    paddingRight: 0,
  },
  pr10: {
    paddingRight: 10
  },
  pl8: {
    paddingLeft: 8
  },
  pl15: {
    paddingLeft: 15
  },
  pt10: {
    paddingTop: 10
  },
  pt15: {
    paddingTop: 15
  },
  pt20: {
    paddingTop: 20
  },
  marginStatusBar: {
    marginTop: statusBarHeight,
  },
  pabsolute: {
    position: 'absolute',
  },
  flexRow: {
    flexDirection: 'row',
  },
  spaceBtw: {
    justifyContent: 'space-between',
  },
  spaceEvn: {
    justifyContent: 'space-evenly',
  },
  spaceCenter: {
    justifyContent: 'center',
  },
  spaceEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start'
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  overHidden: {
    overflow: 'hidden',
  },
  text7: {
    fontSize: 7,
    color: '#fff',
  },
  text8: {
    fontSize: 8,
    color: '#555',
    //fontFamily: 'helvetica',
  },
  text24: {
    fontSize: 24,
    color: '#fff',
  },
  text26: {
    fontSize: 26,
    color: '#fff',
  },
  text28: {
    fontSize: 28,
    color: '#fff',
  },
  text36: {
    fontSize: 36,
    color: '#fff',
  },
  text42: {
    fontSize: 42,
  },
  text48: {
    fontSize: 48,
    color: '#fff',
  },
  text9: {
    fontSize: 14,
    color: '#fff',
  },
  text10: {
    fontSize: 10,
    color: '#fff',
  },
  text15: {
    fontSize: 15,
    color: '#fff',
  },
  text17: {
    fontSize: 17,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  text18: {
    fontSize: 18,
    color: '#fff',
  },
  text19: {
    fontSize: 19,
    color: '#fff',
  },
  text20: {
    fontSize: 20,
    color: '#fff',
  },
  text14: {
    fontSize: 14,
    color: '#fff',
  },
  text13: {
    fontSize: 13,
    color: '#fff',
  },
  text12: {
    fontSize: 12,
    color: '#fff',
  },
  text11: {
    fontSize: 11,
    color: '#fff',
  },
  text21: {
    fontSize: 21,
    color: '#fff',
  },
  textLine18: {
    lineHeight: 18,
  },
  textLine21: {
    lineHeight: 21,
  },
  count2Text: {
    fontSize: 16,
    color: '#aaa',
  },
  textWhite: {
    color: '#fff',
  },
  textBlack: {
    color: '#000',
  },
  textGrey: {
    color: '#777',
  },
  textGrey2: {
    color: '#51525B',
  },
  textDark: {
    color: '#242924',
  },
  textRed: {
    color: '#f52424',
  },
  textBlue: {
    color: '#1751A5',
  },
  textDarkBlue: {
    color: '#140D3F',
  },
  textGreen: {
    color: '#17A57A',
  },
  textGreen2: {
    color: '#1BCB21',
  },
  textGreen3: {
    color: '#04B700',
  },
  textOrange: {
    color: '#FB5734',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  aCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  jCenter: {
    justifyContent: 'center',
  },
  image9: {
    height: 9,
    width: 9,
    resizeMode: 'contain',
  },
  image24: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
  image27: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  image30: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  image32: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  image42: {
    height: 42,
    width: 42,
    resizeMode: 'contain',
  },
  image44: {
    height: 44,
    width: 44,
    resizeMode: 'contain',
  },
  image49: {
    height: 49,
    width: 49,
    resizeMode: 'contain',
  },
  avatarImage: {
    height: 68,
    width: 68,
    resizeMode: 'cover',
  },
  image72: {
    height: 72,
    width: 72,
    resizeMode: 'contain',
  },
  image84: {
    height: 84,
    width: 84,
    resizeMode: 'contain',
  },
  avatar41: {
    height: 41,
    width: 41,
    resizeMode: 'cover',
  },
  image60: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  image20: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  image26: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  image13: {
    height: 13,
    width: 13,
    resizeMode: 'contain',
  },
  image14: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
  },
  image15: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  image18: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  image36: {
    height: 36,
    width: 36,
    resizeMode: 'contain',
  },
  image40: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  image68: {
    height: 68,
    width: 68,
    resizeMode: 'contain',
  },
  btn40: {
    height: 40,
    width: 40,
  },
  backgr: {
    height: height,
    width: width,
    resizeMode: 'stretch',
  },
  backColor: {
    backgroundColor: '#fff',
  },
  topBar: {
    height: 50,
  },
  btn56: {
    height: 56,
    width: 56,
  },
  btn53: {
    height: 53,
    width: 53,
  },
  btn50: {
    height: 50,
    width: 50,
  },
  h25: {
    height: 25,
  },
  h40: {
    height: 40,
  },
  h56: {
    height: 56,
  },
  h46: {
    height: 46,
  },
  h53: {
    height: 53,
  },
  h35: {
    height: 35,
  },
  monda: {
    fontFamily: 'monda',
  },
  factor: {
    fontFamily: 'factor_a',
  },
  factorBold: {
    fontFamily: 'factor_a_bold',
  },
  factorMedium: {
    fontFamily: 'factor_a_medium',
  },
  factorLight: {
    fontFamily: 'factor_a_light',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  inputBlock: {
    height: 46,
    width: width - 30,
    borderRadius: 8,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  halfInputBlock: {
    height: 46,
    //width: width - 30,
    borderRadius: 8,
    borderColor: '#aaa',
    borderWidth: 1,
  },
  orangeBtn: {
    height: 50,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FB5734',
  },
  disableBtn: {
    height: 50,
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#BBBBBB',
  },
  tabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F8F1F0',
    //backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    position: 'absolute',
    //height: 60,
    //paddingBottom: 10,
  },
  personIcon: {
    height: 68,
    width: 68,
  },
  whiteRound: {
    height: 76,
    width: 76,
    borderRadius: 38,
    backgroundColor: '#fff'
  },
  whiteRoundBtn: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#999',
  },
  image72r: {
    height: 72,
    width: 72,
    borderRadius: 36,
    resizeMode: 'cover'
  },
  image48r: {
    height: 48,
    width: 48,
    borderRadius: 24,
    resizeMode: 'cover'
  },
  image50r: {
    height: 50,
    width: 50,
    borderRadius: 25,
    resizeMode: 'cover'
  },
  image50rb: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'cover'
  },
  image60r: {
    height: 60,
    width: 60,
    borderRadius: 30,
    resizeMode: 'cover'
  },
  image60rw: {
    height: 64,
    width: 64,
    borderRadius: 32,
    borderColor: '#fff',
    borderWidth: 2,
    resizeMode: 'cover'
  },
  ava: {
    width: 78,
  },
  userIcon: {
    height: 68,
    width: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  greyBottom: {
    borderColor: '#ddd',
    borderBottomWidth: 1
  },
  greyLine: {
    backgroundColor: '#ddd',
    //width: width,
    height: 1
  },
  addBtn: {
    bottom: 22,
    right: 12
  },
  blogInput: {
    height: 36,
    borderRadius: 18,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  photoView: {
    height: (92 * width) / 375,
    width: width,
    resizeMode: 'contain'
  },
  photoViewAlso: {
    height: (92 * width - 30) / 375,
    width: width - 30,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  videoView: {
    // height: (184 * width) / 375,
    height: 9 * width / 16,
    width: width,
    resizeMode: 'contain'
  },
  autorView: {
    backgroundColor: 'rgba(255,255,255, 0.6)',
    height: 54,
    //width: 170,
    borderRadius: 27,
    paddingLeft: 2,
    paddingRight: 20,
  },
  freeView: {
    height: 24,
    width: 90,
    backgroundColor: '#FB5734',
    borderRadius: 12,
  },
  termView: {
    height: 24,
    //width: 90,
    backgroundColor: '#FB5734',
    borderRadius: 12,
  },
  post: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  blogModal: {
    backgroundColor: '#fff',
    width: 250, //width*0.5 < 240 ? 240 : width*0.5,
    borderRadius: 8,
  },
  vanishModal: {
    backgroundColor: '#fff',
    width: width - 30,
    borderRadius: 8,
    top: 0.5 * width
  },
  exitModal: {
    backgroundColor: '#fff',
    width: width - 30,
    borderRadius: 8,
    //top: 0.5*width
  },
  carouselView: {
    backgroundColor: '#F8F1F0'
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000'
  },
  orangeRoundBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#FB5734',
  },
  buttonsDrawer: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F8F1F0'
  },
  drawerBtn: {
    height: 50,
    width: 50,
  },
  noteBar: {
  },
  noteImg: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
    borderRadius: 4,
  },
  pinkLine: {
    height: 12,
    backgroundColor: '#F8F1F0'
  },
  drawer: {
    backgroundColor: '#fff',
    width: 250,
    height: height,
  },
  selector: {
    height: 32,
    borderRadius: 9,
    backgroundColor: '#F8F1F0'
  },
  selectorBtn: {
    height: 28,
    borderRadius: 7,
    backgroundColor: '#fff',
    marginHorizontal: 2
  },
  selector2: {
    height: 32,
    borderRadius: 9,
    backgroundColor: '#767680'
  },
  selector2Btn: {
    height: 28,
    borderRadius: 7,
    backgroundColor: '#636366',
    marginHorizontal: 2
  },
  droPicker: {
    height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listPicker: {
    //height: 46,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItem: {
    backgroundColor: '#F8F1F0'
  },
  hud: {
    height: height,
    width: width,
  },
  bottomControlls: {

  },
  thumbBtnWr: {
    height: 62,
    width: 62,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff'
  },
  thumbBtn: {
    height: 62,
    width: 62,
    borderRadius: 8,
    resizeMode: 'contain',
    borderWidth: 2,
    //borderColor: '#fff'
  },
  tabContainer: {
    height: 0,
    width: width,
  },
  customTabBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F8F1F0',
    height: longIos ? 60 : 50,
    bottom: longIos ? 60 : 50,
  },
  unblockBtn: {
    height: 32,
    width: 140,
    borderRadius: 4,
    borderColor: '#000',
    borderWidth: 1,
  },
  capture: {
    width: 100,
    height: 38,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  pinkBar: {
    backgroundColor: '#F8F1F0',
    height: 50,
    borderRadius: 8,
  },
  popUpWrap: {
    width: width,
    bottom: 120,
  },
  popUp: {
    backgroundColor: '#F8F1F0',
    borderRadius: 8,
    height: 30,
  },
  animHeader: {
    width: width,
    overflow: "hidden",
    zIndex: 2,
  },
  backgroundImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  profileAva: {
    height: 120,
    width: 120,
    borderRadius: 60,
    resizeMode: 'cover',
    backgroundColor: '#aaa'
  },
  avaWrap: {
    backgroundColor: '#fff',
    height: 128,
    width: 128,
    borderRadius: 64,
    left: (width - 128) * 0.5,
    top: 65,
  },
  sideBtn: {
    // backgroundColor: '#fff',
    // borderRadius: 25,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  pinkBack: {
    backgroundColor: '#F8F1F0',
  },
  userStatus: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#37CE63',
    bottom: 11,
    right: 11,
  },
  userStatus1: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#fff',
    backgroundColor: '#37CE63',
    bottom: 0,
    right: 0,
  },
  imageList: {
    width: 100,
    height: 50,
  },
  balance: {
    backgroundColor: '#F8F1F0',
    borderRadius: 8,
  },
  card: {
    width: width - 30,
    height: 0.67 * width,
    borderRadius: 16,
  },
  checkBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  checkGradient: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  checked: {
    width: 30,
    height: 30,
  },
  chatNameBar: {
    height: 80,
  },
  thumb: {
    height: 60,
    width: 60,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  files: {
  },
  video: {
    height: 0.6*width*0.56,
    width: (0.6*width)
  },
  groupImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 40
  },
  backImageStory: {
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  storySlide: {
    height: height,
    width: width,
  },
  storyImg: {
    height: height,
    width: width,
    resizeMode: 'cover'
  }



});