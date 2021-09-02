import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, StyleSheet, ScrollView, View } from 'react-native'
import UploadPrescripion from '../components/uploadprescription'
import HomeHeader from '../components/homeheader'
import GeneralStatusBarColor from '../styles/statusbar'
import Colors from '../styles/color'
import SearchComponent from '../components/search'
import Label from '../components/label'
import Category from '../components/category'
import Images from '../styles/images'

const Home = () => {
    return (
        <View style={styles.container}>
            <GeneralStatusBarColor />
            <HomeHeader />
            <SearchComponent />
            <ScrollView style={styles.scroll}>
                <UploadPrescripion />
                <Label name="Select Category"/>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Category name="Medicines" desc="5 Lakh + Medicines" icon={Images.cat_pharmacy}/>
                    <Category name="Ask Doctor" desc="7 Lakh + Doctors" icon={Images.cat_doctor}/>
                    <Category name="Lab Test" desc="7 Lakh + Labss" icon={Images.cat_lab}/>
                </ScrollView>
                <Label name="Recommended Labs"/>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Category name="Medicines" desc="5 Lakh + Medicines" icon={Images.cat_pharmacy}/>
                    <Category name="Ask Doctor" desc="7 Lakh + Doctors" icon={Images.cat_doctor}/>
                    <Category name="Lab Test" desc="7 Lakh + Labss" icon={Images.cat_lab}/>
                </ScrollView>
                <Label name="Doctors Near You"/>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Category name="Medicines" desc="5 Lakh + Medicines" icon={Images.cat_pharmacy}/>
                    <Category name="Ask Doctor" desc="7 Lakh + Doctors" icon={Images.cat_doctor}/>
                    <Category name="Lab Test" desc="7 Lakh + Labss" icon={Images.cat_lab}/>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.primaryBack,
    },
    scroll:{
        paddingHorizontal:10
    }
})


export default Home