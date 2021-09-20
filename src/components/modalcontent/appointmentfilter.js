import React, { useState } from 'react'
import { StyleSheet, View,Text, TouchableHighlight } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'


const AppointmentFilter = (props) =>{
    const[selected, setSelected] = useState(0)
    return (
        <View style={styles.container}>
            <Text style={[Fontsize.medium,{fontWeight:'bold', color:Colors.other_3, marginStart:20}]}>Filter</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>
                <TouchableHighlight underlayColor={Colors.white} style = {selected == 0? styles.filterActive:styles.filterDefault} onPress={()=>{setSelected(0)}}>
                    <View style = {styles.filterButton}>
                        <Text  style = {selected == 0? styles.labelActived:styles.labelDefault} >Accepted</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={Colors.white} style = {selected == 1? styles.filterActive:styles.filterDefault} onPress={()=>{setSelected(1)}}>
                    <View style = {styles.filterButton}>
                        <Text  style = {selected == 1? styles.labelActived:styles.labelDefault} >Pending</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={Colors.white} style = {selected == 2? styles.filterActive:styles.filterDefault} onPress={()=>{setSelected(2)}}>
                    <View style = {styles.filterButton}>
                        <Text  style = {selected == 2? styles.labelActived:styles.labelDefault} >Rejected</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        borderTopEndRadius:30,
        borderTopStartRadius:30,
        backgroundColor:Colors.white,
        padding:10
    },
    filterButton:{

    },
    filterDefault:{
        width:'30%',
        padding:10,
        backgroundColor:Colors.lightblue,
        borderColor:Colors.doctor_primary,
        borderWidth:1,
        borderRadius:20,
        alignItems:'center'
    },
    filterActive:{
        width:'30%',
        padding:10,
        backgroundColor:Colors.doctor_primary,
        borderColor:Colors.doctor_primary,
        borderWidth:1,
        borderRadius:20,
        alignItems:'center'
    },
    labelDefault:{
        color:Colors.doctor_primary,
        fontWeight:'bold'
    },
    labelActived:{
        color:Colors.white,
        fontWeight:'bold'
    }
})


export default AppointmentFilter