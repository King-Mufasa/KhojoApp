import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import Colors from '../../styles/color'


const OfferBadge = (props) =>{
    return(
        <View style ={styles.container}>
            <Text style={styles.label}>{props.name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        paddingHorizontal:10,
        paddingBottom:2,
        backgroundColor:Colors.lightgreen,
        borderRadius:10,
        alignSelf:'baseline'
    },
    label:{
        color:Colors.white
    }
    
})


export default OfferBadge