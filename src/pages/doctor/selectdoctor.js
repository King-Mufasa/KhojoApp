import React from 'react'
import { View, Image, Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList } from 'react-native'
import Rating from '../../components/rating'
import KButton from '../../components/KButton'
import { screenHeight, screenWidth } from '../../module/IntroSlider/src/themes'
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Fontsize from '../../styles/fontsize'
import APIkit from '../../api/apikit'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';


const initialState = {
    search_filter: '',
    errors: {},
    doctors: {},
    isLoading: false,
    token: ""
}


class DoctorItem extends React.Component {
    render() {
        const avatar = this.props.info.image
        return (
            <SafeAreaView style={styles.doctor}>
                {(avatar != null) ?
                    <Image style={styles.avatar} source={{ uri: 'http://192.168.114.29:8080/' + avatar }} /> :
                    <Image style={styles.fakeavatar} source={{ uri: 'http://192.168.114.29:8080/assets/images/symbol.png' }} />}
                <SafeAreaView style={styles.doctorinfo}>
                    <View>
                        <Text style={[Fontsize.medium]}>{this.props.info.name}</Text>
                        {this.props.info.rating > 0 && <Rating rating={this.props.info.rating} />}
                    </View>
                    <Text style={styles.text}>{this.props.info.address}</Text>
                    <Text style={styles.text}>License on {this.props.info.experience}</Text>
                    <Text style={styles.text}>{this.props.info.clinic}</Text>
                    <View style={styles.budget}>
                        <Text style={styles.text}>Consultation fee:  </Text>
                        <Text style={styles.text}><Icon name="inr" /> {this.props.info.fee}</Text>
                    </View>
                    <KButton name="Book Consultation" style={{ width: "100%" }} />
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}



class DoctorGallery extends React.Component {
    state = initialState
    changeSearchFilter = search_filter => {
        this.setState({ search_filter })
        this.getDoctor()
    }
    getDoctor() {
        const { search_filter } = this.state
        const keyword = { filter_name: search_filter };
        console.log(keyword)
        const onSuccess = ({ data }) => {
            console.log(data)
            this.setState({ doctors: data, isLoading: false  })

        }

        const onFailue = error => {
            console.log(error.response.data)
            this.setState({ errors: error.response.data, isLoading: false })
        }

        this.setState({ isLoading: true })

        console.log(APIkit.defaults.headers)
        APIkit.post('customer.getDoctor/', keyword).then(onSuccess).catch(onFailue)
    }

    render() {
        const { isLoading } = this.state;
        // console.log(this.props)
        // this.getDoctor()
        return (
            <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
                <Spinner visible={isLoading} />
                <SearchComponent callback={this.changeSearchFilter} />
                <Text style={[Fontsize.medium, { margin: 20 }]}>Select Doctor</Text>
                <SectionList
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Doctors', data: this.state.doctors
                        },
                    ]}
                    renderItem={({ item }) => <DoctorItem info={item} />}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    doctor: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginTop: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 45,
        elevation: 8,
        margin: 10
    },
    avatar: {
        margin: 5,
        width: "30%",
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20
    },
    fakeavatar: {
        margin: 5,
        width: "30%",
        height: screenHeight * 0.2,
        borderRadius: 5,
        marginEnd: 20,
        resizeMode: "center"
    },
    doctorinfo: {
        width: '60%',
        marginEnd: 20,
    },
    budget: {
        flexDirection: 'row'
    },
    text: {
        marginTop: 5,
        color: Colors.lightdark
    },
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
})

export default DoctorGallery