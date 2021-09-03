import React, { useState, useEffect, } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet, ScrollView, View, SectionList } from 'react-native'
import UploadPrescripion from '../components/uploadprescription'
import HomeHeader from '../components/homeheader'
import GeneralStatusBarColor from '../styles/statusbar'
import Colors from '../styles/color'
import SearchComponent from '../components/search'
import Label from '../components/label'
import Category from '../components/category'
import Images from '../styles/images'
import DoctorItem from '../components/doctoritem'
import BundleItem from '../components/bundleitem'
import APIkit from '../api/apikit'
import Keywords from '../styles/keywords'
import KeywordItem from '../components/keyworditem'



const Home = (props) => {


    const [doctors, setDoctor] = useState({});
    const [bundles, setBundles] = useState({});

    const navigate = () => {
        const { navigate } = props.navigation
        navigate('SelectDoctor')
    }
    const getDoctors = () => {
        const onSuccess = (data) => {
            setDoctor(data.data)
        }
        const onFailue = () => {
            console.log(data.data)
        }
        APIkit.post('customer.getDoctor/').then(onSuccess).catch(onFailue)
    }
    const getBundles = () => {
        const onSuccess = (data) => {
            setBundles(data.data)
            console.log(bundles)
        }
        const onFailue = (data) => {
            console.log(data.data)
        }
        APIkit.post('customer.getBundle').then(onSuccess).catch(onFailue)
    }
    useEffect(() => {
        getDoctors()
        getBundles()
    }, []
    )
    return (
        <View style={styles.container}>
            <GeneralStatusBarColor />
            <HomeHeader />
            <SearchComponent />
            <ScrollView style={styles.scroll}>
                <UploadPrescripion />
                <Label name="Select Category" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Category name="Medicines" desc="5 Lakh + Medicines" icon={Images.cat_pharmacy} />
                    <Category name="Ask Doctor" desc="7 Lakh + Doctors" icon={Images.cat_doctor} />
                    <Category name="Lab Test" desc="7 Lakh + Labss" icon={Images.cat_lab} />
                </ScrollView>
                <Label name="Explore by Health Concerns" />
                <SectionList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Bundles', data: Keywords
                        },
                    ]}
                    renderItem={({ item }) => <KeywordItem info={item} />}
                    keyExtractor={(item, index) => index}
                />
                <Label name="Doctors Near You" />
                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
                <SectionList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Doctors', data: doctors
                        },
                    ]}
                    renderItem={({ item }) => <DoctorItem click={navigate} info={item} />}
                    keyExtractor={(item, index) => index}
                />
                <Label name="Live Test Bundles" />
                <SectionList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                    sections={[
                        {
                            title: 'Bundles', data: bundles
                        },
                    ]}
                    renderItem={({ item }) => <BundleItem click={navigate} info={item} />}
                    keyExtractor={(item, index) => index}
                />
                {/* </ScrollView> */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBack,
    },
    scroll: {
        paddingHorizontal: 10
    }
})


export default Home