import React, { useState, useEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet, ScrollView, View, SectionList, Image, TouchableHighlight } from 'react-native'
import UploadPrescripion from '../../components/uploadprescription'
import HomeHeader from '../../components/homeheader'
import GeneralStatusBarColor from '../../styles/statusbar'
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Label from '../../components/label'
import Category from '../../components/category'
import Images from '../../styles/images'
import DoctorItem from '../../components/doctoritem'
import BundleItem from '../../components/items/bundleitem'
import APIkit from '../../api/apikit'
import Keywords from '../../styles/keywords'
import KeywordItem from '../../components/keyworditem'
import {StandardStyles} from '../../styles/standardstyles'
import Fontsize from '../../styles/fontsize'
import { useGlobalState } from '../../store/state'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import config from '../../config'
import moment from 'moment'
import { Divider } from 'react-native-paper'

const DoctorHome = ({ navigation }) => {

    const [doctors, setDoctor] = useState({});
    const [bundles, setBundles] = useState({});
    const [user] = useGlobalState('user')
    const navigateToDoctor = () => {
        const { navigate } = navigation
        navigate("SelectDoctor", { label: "", id: null, sepc: null })
    }
    const navigateToLab = () => {
        const { navigate } = navigation
        navigate("SelectLabs")
    }
    const navigateToPharmacy = () => {
        const { navigate } = navigation
        navigate("SelectPharmacy")
    }
    const selectDoctor = (id) => {
        const { navigate } = navigation
        navigate('Schedule', { doctor: id })
    }
    const navigateToService = () => {
        const { navigate } = navigation
        navigate("SelectService")
    }
    const navigate = (spec) => {
        const { navigate } = navigation
        navigate("SelectDoctor", { spec: spec })
    }
    const getDoctors = () => {
        const onSuccess = (data) => {
            setDoctor(data.data)
        }
        const onFailue = () => {
        }
        APIkit.post('customer.getDoctor/').then(onSuccess).catch(onFailue)
    }
    const getBundles = () => {
        const onSuccess = (data) => {
            setBundles(data.data)
        }
        const onFailue = (data) => {
        }
        APIkit.post('customer.getBundle').then(onSuccess).catch(onFailue)
    }

    useEffect(() => {
        console.log(user.image)
        getDoctors()
        getBundles()
    }, []
    )
    return (
        <View style={styles.container}>
            <GeneralStatusBarColor />
            <HomeHeader nav={navigation} />
            <ScrollView style={styles.scroll}>
                {/* <UploadPrescripion /> */}
                <Label name="Explore by Health Concerns" />
                <View style={styles.infocontainer}>
                    <View style={[StandardStyles.commonfillview, styles.data]}>
                        <Image source={{ uri: user.image == null ? Images.default_symbol : user.image.uri }} style={styles.avatar} />
                        <View style={[StandardStyles.coupleview, { alignSelf: 'flex-end' }]}>
                            <Text style={[Fontsize.large, { color: Colors.white, fontWeight: 'bold' }]}>Total Patients:</Text>
                            <Text style={styles.countTotal}>143</Text>
                        </View>
                    </View>
                    <View style={styles.tinyheader}></View>
                </View>
                <View style={[StandardStyles.commonview, styles.data_schedule]}>
                    <TouchableHighlight style={styles.schedule}>
                        <View >
                            <Text style={{ color: Colors.lightdark }}>{moment(new Date()).format('LL')}</Text>
                            <View style={[StandardStyles.coupleview, { width: '100%', justifyContent: 'space-between', marginTop:10 }]}>
                                <Text style={[Fontsize.medium, { color: Colors.other_2, fontWeight: 'bold' }]}>Today's Schedule:</Text>
                                <Text style={[Fontsize.medium, { color: Colors.success, fontWeight: 'bold' }]}>4</Text>
                            </View>
                            <Divider/>
                            <View style={[StandardStyles.coupleview, { width: '100%', justifyContent: 'space-between', marginTop:10 }]}>
                                <Text style={[Fontsize.small, { color: Colors.other_2, fontWeight: 'bold' }]}>Total Schedule:</Text>
                                <Text style={[Fontsize.small, { color: Colors.doctor_primary, fontWeight: 'bold' }]}>44</Text>
                            </View>
                            <Divider/>
                            <View style={[StandardStyles.coupleview, { width: '100%', justifyContent: 'space-between', marginTop:10 }]}>
                                <Text style={[Fontsize.small, { color: Colors.other_2, fontWeight: 'bold' }]}>UpComming Schedule:</Text>
                                <Text style={[Fontsize.small, { color: Colors.doctor_primary, fontWeight: 'bold' }]}>5</Text>
                            </View>
                            <Divider/>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    countTotal: {
        color: Colors.other_6,
        fontWeight: 'bold',
        fontSize: 40,
        fontFamily: 'DaydenBatemisy'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
    },
    secondcontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    avatar: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        resizeMode: 'contain',
        borderRadius:20,
        borderBottomWidth:2,
    },
    scroll: {
        paddingHorizontal: 10
    },
    data: {
        justifyContent: 'space-between',
        elevation: 4,
        zIndex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    data_schedule: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderColor: Colors.other_2,
        borderWidth: 1
    },
    schedule:{
        flex:1
    },  
    tinyheader: {
        width: 60,
        height: 20,
        borderRadius: 40,
        backgroundColor: Colors.other_1,
        position: 'absolute',
        marginStart: 30,
        zIndex: 2,
        elevation: 5,
    },

})


export default DoctorHome