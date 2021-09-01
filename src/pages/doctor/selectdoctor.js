import React from 'react'
import { View, Image,Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList } from 'react-native'
import Rating from '../../components/rating'
import KButton from '../../components/KButton'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Fontsize from '../../styles/fontsize'

class DoctorItem extends React.Component{
    render(){
        let avatar = { uri: 'https://drive.google.com/thumbnail?id=1RHt9vhUZdUlzEJwO6du8JJRwsfCXSr3I' };
        return(
            <SafeAreaView style={styles.doctor}>
                <Image style={styles.avatar} source={avatar}/>
                <SafeAreaView style={styles.doctorinfo}>
                    <View>
                        <Text style={[Fontsize.medium]}>{this.props.info.name}</Text>
                        <Rating rating={4.5} />
                    </View>
                    <Text style={styles.text}>{this.props.info.address}</Text>
                    <Text style={styles.text}>{this.props.info.experience}</Text>
                    <Text style={styles.text}>{this.props.info.clinic}</Text>
                    <View style={styles.budget}>
                        <Text style={styles.text}>Consultation fee:  </Text>
                        <Text style={styles.text}><Icon name="inr"/> {this.props.info.fee}</Text>
                    </View>
                    <KButton name="Book Consultation" style={{width:"100%"}}/>
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

class DoctorGallery extends React.Component{

    render(){
        return(
            <SafeAreaView style={{backgroundColor:Colors.primaryBack}}>
            <SearchComponent />
            <Text style={[Fontsize.medium,{margin:20}]}>Select Doctor</Text>
            <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Doctors', data: [
                                { avatar: "first-order", name: 'My Order', experience:"SelectDoctor", address:"Ghost street bone building", fee:500, rating:4.5, clinic:"Denber" }
                                , { avatar: "address-book", name: 'Manage Address', experience:"SelectDoctor", address:"Ghost street bone building", fee:500, rating:4.5, clinic:"Denber" }
                                , { avatar: "heart", name: 'Wishlist',experience:"SelectDoctor", address:"Ghost street bone building", fee:500, rating:4.5, clinic:"Denber" }
                                , { avatar: "flask", name: 'My Lab Tests',experience:"SelectDoctor", address:"Ghost street bone building", fee:500, rating:4.5, clinic:"Denber" }
                                , { avatar: "credit-card-alt", name: 'Payment Methods',experience:"SelectDoctor", address:"Ghost street bone building", fee:500, rating:4.5, clinic:"Denber" }
                            ]
                        },
                    ]}
                    renderItem={({ item }) => <DoctorItem info={item}/>}
                    keyExtractor={(item, index) => index}
                />
                </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    doctor:{
        flexDirection:'row',
        backgroundColor:Colors.white,
        borderRadius:10,
        marginTop:20,
        paddingVertical:10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },  
    avatar:{
        margin:5,
        width:"30%",
        height:screenHeight*0.2,
        borderRadius:5,
        marginEnd:20
    },
    doctorinfo:{
        width:'60%',
        marginEnd:20,
    },
    budget:{
        flexDirection:'row'
    },
    text:{
        color:Colors.lightdark
    },
    scrollView: {
        paddingHorizontal: 20,
        marginBottom:200

    },
})

export default DoctorGallery