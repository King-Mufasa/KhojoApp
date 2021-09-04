import React from 'react'
import Colors from '../styles/color'
import Fontsize from '../styles/fontsize'
import {Text} from 'react-native'

const LightLabel = (props) =>{
    return(
        <Text style={[Fontsize.mini,{color:Colors.lightdark}]}>{props.text}</Text>
    )
}

export default LightLabel