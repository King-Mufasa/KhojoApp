import React from 'react'
import {Image, StyleSheet} from 'react-native'
import config from '../config'
import { screenWidth } from '../module/IntroSlider/src/themes'
import Images from '../styles/images'

const Avatar = (props) =>{
    return(
        <Image source = {{uri:(props.image?config.baseurl+props.image:Images.default_symbol)}} style={[props.style, styles.avatar]}/>
    )
}


const styles =StyleSheet.create({
    avatar:{
        width:screenWidth*0.2,
        height:screenWidth*0.2,
        borderRadius:10,
        margin:10
    }    
})

export default Avatar
