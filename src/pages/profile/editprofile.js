import React from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'


class EditView extends React.Component{
    render(){
        return(
            <SafeAreaView style={this.props.style}>
                <Text style={[Fontsize.small,{marginTop:20}]}>{this.props.label}</Text>
                <TextInput 
                    style={[styles.input, Fontsize.small]}
                    keyboardType={this.props.type}
                    maxLength={20}
                    value={this.props.value}
                />
            </SafeAreaView>
        )
    }
}


class EditProfile extends React.Component{

    render(){
        let avatarLink= { uri: 'https://drive.google.com/thumbnail?id=1RHt9vhUZdUlzEJwO6du8JJRwsfCXSr3I' };
        return(
            <SafeAreaView style={styles.container}>
                <Text style={Fontsize.medium}>Edit Profile</Text>
                <SafeAreaView style={styles.subcontainer}>
                    <Image source={avatarLink} style={styles.avatar} />
                    <SafeAreaView style={styles.namearea}>
                        <EditView label="First Name" style={styles.name}/>
                        <View style={{width:"8%"}}></View>
                        <EditView label="Last Name" style={styles.name}/>
                    </SafeAreaView>
                    <EditView label="Email" />
                    <EditView label="Mobile Number" />
                    <KButton name="Save" style={{width:"100%", marginTop:40}} click={()=>{alert("Profile Changed!")}}/>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:20,
        backgroundColor:Colors.primaryBack
    },
    subcontainer:{
        backgroundColor:Colors.white,
        padding:20,
        marginTop:20
    },
    avatar:{
        width:screenWidth*0.2,
        height:screenWidth*0.2,
        borderRadius:10
    },
    input:{
        width:"100%",
        marginTop:5,
        borderRadius:5,
        borderWidth:2,
        borderColor:Colors.lightdark,
        paddingHorizontal:20
    },
    namearea:{
        width:"100%",
        flexDirection:'row',
        marginTop:20
    },
    name:{
        width:'46%',
    },

})

export default EditProfile