import React from 'react'
import {StyleSheet, Text} from 'react-native'
import Fontsize from '../styles/fontsize'

const Label = (props) =>{
    return (
        <Text style={
            [{
                textAlign:'left',
                fontWeight:'bold',
                marginHorizontal:10
            },
            props.size=="medium"?Fontsize.medium:Fontsize.mini
        ]
        }>{props.name}</Text>
    )
}


export default Label