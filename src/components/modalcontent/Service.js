import React from 'react'
import { View, StyleSheet, Text, TextInput, } from 'react-native'
import KButton from '../KButton'
import Fontsize from '../../styles/fontsize'
import EditView from '../util/editview'
import SelectDropdown from 'react-native-select-dropdown'
import Colors from '../../styles/color'
import Icon from 'react-native-vector-icons/FontAwesome';
import { screenWidth } from '../../module/IntroSlider/src/themes'
import { Divider, } from 'react-native-elements';
import StandardStyles from '../../styles/standardstyles'

const type = [
    { title: "Me", image: 'user' },
    { title: "Family", image: 'home' },
    { title: "Friend", image: 'handshake-o' },
    { title: "Custom", image: 'user' },
]

const Service = (props) => {
    return (
        <View>
            <View style={styles.modal}>
                <View style={styles.inputlayer}>
                    <Text style={[styles.title,Fontsize.medium]}>{props.service.title}</Text>
                </View>
                <Divider orientation="horizontal" inset={true} insetType="middle" />
                <View style={styles.inputlayer}>
                    <TextInput style = {styles.desc} value = {props.desc} onChangeText={props.change}
                    maxLength={220}
                    multiline={true}
                    numberOfLines={3} 
                    placeholder="Description"
                    ></TextInput>
                </View>
                <KButton name="Request Service" click={() => { props.action()}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modal: {
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: Colors.primaryBack
    },
    desc:{
        backgroundColor: Colors.lightblue,
        width: "100%",
        textAlignVertical: 'top', 
        borderRadius:10
    },
    
    inputlayer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        marginVertical: 10
    },
    title:{
        alignSelf:'center',
        marginStart:10,
        fontWeight:'bold',
        color:Colors.primary
    }
}
)


export default Service

