import React from 'react'
import { TouchableHighlight } from 'react-native'
import { View, Image, Text, StyleSheet } from 'react-native'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Commonstyle from '../styles/comonview'
import Fontsize from '../styles/fontsize'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig  from '../assets/font/selection.json';
import Colors from '../styles/color'
const Icon = createIconSetFromIcoMoon(icomoonConfig );
const KeywordItem = (props) => {

    return (
        <TouchableHighlight onPress={()=>{props.action(props.info.spec)}} underlayColor={Colors.lightblue}>
            <View style={[Commonstyle, styles.container]}>
                <Icon name={props.info.icon} size={40} color={Colors.primary}/>
                <Text style={[Fontsize.mini, { marginTop: 10, textAlign: 'center' }]}>{props.info.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.23,
        flexDirection: "column",
        alignItems: 'center'
    }
})

export default KeywordItem