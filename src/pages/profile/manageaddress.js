import React from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View, SectionList, TouchableHighlight } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'
import Icon from 'react-native-vector-icons/FontAwesome';


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

function addNew = {
    
}


class ManageAddress extends React.Component{

    render(){
        let avatarLink= { uri: 'https://drive.google.com/thumbnail?id=1RHt9vhUZdUlzEJwO6du8JJRwsfCXSr3I' };
        return(
            <SafeAreaView style={styles.container}>
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'My Account', data: [
                                { icon: "first-order", label: 'My Order', key:"order" }
                                , { icon: "address-book", label: 'Manage Address', key:"ManageAddress" }
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
                    renderItem={({ item }) => <TouchableHighlight style={styles.listbutton} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={()=> navigate(item.key)}><SafeAreaView style={styles.listitem}><Icon name={item.icon} size={25} style={styles.icon} /><Text style={styles.item}>{item.label}</Text></SafeAreaView></TouchableHighlight>}
                    renderSectionHeader={({ section }) => <Text style={[styles.sectionHeader, Fontsize.small]}>{section.title}</Text>}
                    keyExtractor={(item, index) => index}
                />
                <KButton name="Add New Address" />
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
    

})

export default ManageAddress