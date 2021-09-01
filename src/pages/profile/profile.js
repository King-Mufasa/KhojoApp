import React from 'react'
import { SafeAreaView, Image, StyleSheet, Text, View, SectionList, ScrollView } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import { Divider, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
class ProfileHeader extends React.Component {
    render() {
        const navigate = this.props.nav
        return (
            <View style={styles.profilecontainer}>
                <Image source={this.props.url} style={styles.avatar} />
                <View style={styles.profileinfo}>
                    <Text style={[styles.name, Fontsize.medium]}>Naomi Igarashi</Text>
                    <Text style={Fontsize.small}>+91 8652499876</Text>
                </View>
                <BadgeButton style={styles.edit} name="Edit" click={()=>navigate("EditProfile")} />
            </View>
        )
    }
}

class MyAccount extends React.Component {
    render() {
        return (
            <SafeAreaView>

            </SafeAreaView>
        )
    }
}


class More extends React.Component {
    render() {
        return (
            <SafeAreaView>

            </SafeAreaView>
        )
    }
}


class Profile extends React.Component {

    render() {
        const {navigate} = this.props.navigation
        let avatar = { uri: 'https://drive.google.com/thumbnail?id=1RHt9vhUZdUlzEJwO6du8JJRwsfCXSr3I' };
        return (
            <SafeAreaView style={styles.container}>
                <ProfileHeader url={avatar} nav={navigate}/>
                <Divider orientation="horizontal" inset={true} insetType="middle" />
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'My Account', data: [
                                { icon: "first-order", label: 'My Order' }
                                , { icon: "address-book", label: 'Manage Address' }
                                , { icon: "heart", label: 'Wishlist' }
                                , { icon: "flask", label: 'My Lab Tests' }
                                , { icon: "credit-card-alt", label: 'Payment Methods' }
                            ]
                        },
                        {
                            title: 'More', data: [
                                { icon: "wechat", label: 'Help' }
                                , { icon: "gratipay", label: 'Rate Us' }
                                , { icon: "question-circle", label: 'FAQs' }
                                , { icon: "sign-out", label: 'Log Out' }
                            ]
                        },
                    ]}
                    renderItem={({ item }) => <SafeAreaView style={styles.listitem}><Icon name={item.icon} size={25} style={styles.icon} /><Text style={styles.item}>{item.label}</Text></SafeAreaView>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack
    },
    avatar: {
        width: screenWidth * 0.15,
        height: screenWidth * 0.15,
        borderRadius: 5,
        margin: 15,
        resizeMode: "contain"
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
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        borderColor: Colors.lightblue,
        borderWidth: 1,
        marginTop: 10
    },
    scrollView: {
        paddingHorizontal: 20,
        marginBottom:20
    },
    icon: {
        color: Colors.primary,
        width: screenWidth * 0.1
    }



})

export default Profile