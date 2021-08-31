import React from 'react'
import { SafeAreaView, Image, StyleSheet } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
const ProfileHeader = () =>{
    return(
        <SafeAreaView style={styles.profilecontainer}>
            <Image source=""/>
            <SafeAreaView style={styles.profileinfo}>
                <Text style={[styles.name, Fontsize.medium]}>Naomi Igarashi</Text>
                <Text style={Fontsize.small}>+91 8652499876</Text>
            </SafeAreaView>
            <BadgeButton name="Edit"/>
        </SafeAreaView>
    )
}



class Profile extends React.Component{

    render(){
        return(
            <SafeAreaView>
                <ProfileHeader />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    profile:{
        flex:2,
        width:30,
        height:30,
    },
    profilecontainer:{
        flex:10,
        flexDirection:"row",
    },
    profileinfo:{
        flex:6,
    },
    name:{
        fontWeight:'bold'
    }


})

export default Profile