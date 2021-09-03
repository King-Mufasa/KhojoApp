import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Commonstyle from '../styles/comonview'
import Fontsize from '../styles/fontsize'


const KeywordItem = (props)=>{
    console.log(props)
    return(
        <View style={[Commonstyle,styles.container]}>
            <Image source={props.info.image}/>
            <Text style={[Fontsize.mini,{marginTop:10}]}>{props.info.title}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        width:screenWidth*0.2,
        flexDirection:"column",
        alignItems:'center'
    }
})

export default KeywordItem