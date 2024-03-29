import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Colors from '../styles/color'
import { screenHeight } from '../module/IntroSlider/src/themes'
import Fontsize from '../styles/fontsize'
import { Badge } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGlobalState } from '../store/state'
const HomeHeader = (props) => {
    const [doctormode] = useGlobalState('doctormode')
    const [user] = useGlobalState('user')
    const Navigate=()=>{
    const {navigate} = props.nav
        navigate("Notification")
    }
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: doctormode?Colors.doctor_primary:Colors.primary}]}>
            <Text style={[styles.name, Fontsize.large]}>{user.name}</Text>
            <TouchableHighlight onPress={Navigate} underlayColor={Colors.primary}>
                <View style={styles.notif} >
                    <Icon name="bell" size={25} style={{ color: Colors.white }} />
                    <Badge
                        value="1"
                        status="error"
                        containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                    />
                </View>
            </TouchableHighlight>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        height: screenHeight * 0.1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontWeight: 'bold',
        color: Colors.white
    },
    notif: {
        alignSelf: 'center',
    }
})


export default HomeHeader