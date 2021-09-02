import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text,TouchableHighlight, StyleSheet} from 'react-native'
import Colors from '../styles/color'
import Fontsize from '../styles/fontsize'
const UploadPrescripion = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={Fontsize.small}>Order with Prescription</Text>
            <TouchableHighlight
                style={[styles.button]}
                onPress={(props.click)}
                underlayColor={Colors.white}>
                <Text style={[{color:Colors.white, fontWeight:'bold'}, Fontsize.small]}>Upload</Text>
            </TouchableHighlight>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        padding:20,
        backgroundColor:Colors.white,
        borderRadius:5,
        shadowColor: Colors.primary,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    button:{
        backgroundColor:Colors.primary,
        paddingHorizontal:40,
        paddingVertical:10,
        alignSelf:'flex-end',
        
        borderRadius:50
    }
})

export default UploadPrescripion