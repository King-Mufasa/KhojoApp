import React from 'react'
import { TouchableHighlight } from 'react-native'
import { View, Image, Text, StyleSheet } from 'react-native'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Commonstyle from '../styles/comonview'
import Fontsize from '../styles/fontsize'


const KeywordItem = (props) => {
    return (
        <TouchableHighlight>
            <View style={[Commonstyle, styles.container]}>

                <Image source={props.info.image} />
                <Text style={[Fontsize.mini, { marginTop: 10, textAlign: 'center' }]}>{props.info.title}</Text>

            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth * 0.2,
        flexDirection: "column",
        alignItems: 'center'
    }
})

export default KeywordItem