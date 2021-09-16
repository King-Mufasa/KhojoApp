import React from 'react'
import { SafeAreaView, Image, StyleSheet, Text, View, SectionList, TouchableHighlight } from 'react-native'
import Colors from '../../../styles/color'
import Fontsize from '../../../styles/fontsize'
import BadgeButton from '../../../components/badgebtn'
import { screenWidth } from '../../../module/IntroSlider/src/themes'
import { Divider, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useGlobalState } from '../../../store/state'
import Images from '../../../styles/images'

const ProfileHeader = (props) => {
    return (
        <View style={styles.profilecontainer}>
            <Image source={props.url} style={styles.avatar} />
            <View style={styles.profileinfo}>
                <Text style={[styles.name, Fontsize.medium]}>{props.name}</Text>
                <Text style={Fontsize.small}>+91 {props.user.phone}</Text>
            </View>
            <BadgeButton style={styles.edit} name="Edit" click={() => props.nav("EditProfile")} />
        </View>
    )

}


const Profile = (props) => {

    const { navigate } = props.navigation
    const [user] = useGlobalState('user')
    const { image, name } = user
    return (
        <SafeAreaView style={styles.container}>
            <ProfileHeader user={user} url={{ uri: (image != null ? image.uri : Images.default_symbol) }} nav={navigate} name={name} />
            <Divider orientation="horizontal" inset={true} insetType="middle" />
            
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'My Account', data: [
                            { icon: "first-order", label: 'My Order', key: "OrderMenu" }
                            , { icon: "address-book", label: 'Manage Address', key: "ManageAddress" }
                            , { icon: "user", label: 'Manage Patient', key: "ManagePatient" }
                            , { icon: "map", label: 'My Location', key:"MyPlace" }
                            // , { icon: "flask", label: 'My Lab Tests' }
                            // , { icon: "credit-card-alt", label: 'Payment Methods' }
                        ]
                    },
                    {
                        title: 'More', data: [
                            { icon: "wechat", label: 'Help' }
                            , { icon: "gratipay", label: 'Rate Us' }
                            , { icon: "question-circle", label: 'FAQs' }
                            // , { icon: "sign-out", label: 'Log Out' }
                        ]
                    },
                ]}
                renderItem={({ item }) => <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => navigate(item.key)}><SafeAreaView style={styles.listitem}><Icon name={item.icon} size={25} style={styles.icon} /><Text style={styles.item}>{item.label}</Text></SafeAreaView></TouchableHighlight>}
                renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack
    },
    avatar: {
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        borderRadius: 10,
        margin: 15,
        resizeMode: "cover"
    },
    profileinfo: {
        flex: 8
    },
    name: {
        fontWeight: 'bold'
    },
    edit: {
        flex: 2,
        height: 30
    },

    profilecontainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    listitem: {
        flexDirection: "row",
        alignItems: "center",

    },
    listbutton: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginTop: 10
    },
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    }



})

export default Profile