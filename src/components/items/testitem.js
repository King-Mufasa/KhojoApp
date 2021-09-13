import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ToggleCart from '../button/togglecart'
import RoundButton from '../roundbutton'
import Commonstyle from '../../styles/comonview'
import Fontsize from '../../styles/fontsize'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';

const TestItem = (props) => {
    console.log(props.toggle)
    return (
        <View style={[styles.container,Commonstyle]}>
            <View style={{alignSelf:'center'}}>
                <Text style={Fontsize.small,{fontWeight:'bold'}}>{props.info.name}</Text>
                <Text style={Fontsize.mini,{color:Colors.lightdark}}>{props.info.type}</Text>
                <Text style={Fontsize.small,{color:Colors.success,fontWeight:"bold"}}><Icon name="inr" /> {props.info.rate}</Text>
            </View>
            <ToggleCart toggle={props.toggle} click={()=>{props.change("test",props.info.id)}}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20,
        paddingVertical:10
    }
})
export default TestItem