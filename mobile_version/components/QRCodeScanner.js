import React, { useState, useEffect  } from 'react';

import {
    View,
    Text,
    Image,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions, 
    Platform
  } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
const { width, height } = Dimensions.get("screen")
import s from '../styles/style'
import text from '../assets/base/text';

export default function QRCodeScanner(props) {

    let lang = props.lang
    console.log('title', text[lang].withdraw, text[lang].tapexit)
    //--- QR scanner -----------------------------
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <View style={s.container}>
                <Text>Requesting for camera permission</Text>
              </View>;
    }
    if (hasPermission === false) {
      return  <View style={s.container}>
                <Text>No access to camera</Text>
              </View>;
    }
    //--------------------------------------------


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#585858',
        //flexDirection: 'column',
        justifyContent: 'flex-end',
        //paddingBottom: 20,
      }}>

      {/* <Button title={'<'} onPress={() => props.onBack()} /> */}

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {!scanned && <Button title={text[lang].tapexit} onPress={() => props.onBack()} />}
      {scanned && <Button title={text[lang].tapscanagain} onPress={() => setScanned(false)} />}
    </View>

  );
}
