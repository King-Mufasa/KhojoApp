import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text,TouchableHighlight, StyleSheet, Image} from 'react-native'
import Colors from '../styles/color'
import Fontsize from '../styles/fontsize'
import Images from '../styles/images'
import { screenWidth } from '../module/IntroSlider/src/themes'
const SetPrescription = (props) => {
    console.log(props.isready)
    return (
        <SafeAreaView style={[styles.container,{backgroundColor:props.isready?Colors.success:Colors.primary,}]}>
            <TouchableHighlight
                style={[styles.button]}
                onPress={(props.isready?props.request:props.click)}
                underlayColor={Colors.white}>
                <Image source={Images.ico_prescription} style={styles.icon}/>
            </TouchableHighlight>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center',
        padding:20,
        borderRadius:5,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        marginTop:10
    },
    button:{
        alignSelf:'flex-end',
        
        borderRadius:50
    },
    icon:{
        width:screenWidth*0.2,
        height:screenWidth*0.2
    }
})

export default SetPrescription