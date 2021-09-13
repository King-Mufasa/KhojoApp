import React from 'react'
import { View, Image, Text } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList } from 'react-native'
import Rating from '../../components/rating'
import KButton from '../../components/KButton'

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Fontsize from '../../styles/fontsize'
import APIkit from '../../api/apikit'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DoctorItem from '../../components/doctoritem'
import { useState } from 'react'
import { useEffect } from 'react'


const DoctorGallery = (props) => {
    const [search_filter, setSearch] = useState()
    const [doctors, setDoctor] = useState([])
    const [isloaing, setloading] = useState(false)
    const [spec_id, setSpecId] = useState(props.navigation.state.params.id)
    const [spec_label, setSpecLabel] = useState(props.navigation.state.params.label)
    const changeSearchFilter = search_filter => {
        setSearch(search_filter)
    }
    const getDoctor = () => {   
        const keyword = { filter_name: search_filter };
        const onSuccess = ({ data }) => {
            setloading(false)            
            setDoctor(data)
            console.log(doctors)
        }
        const onFailue = error => {
            setloading(false)
            console.log(error.response.data)
        }
        setloading(true)
        APIkit.post('customer.getDoctor/', keyword).then(onSuccess).catch(onFailue)
    }
    const navigate = (doctor) => {
        const { navigate } = props.navigation
        navigate('Schedule',{doctor:doctor})
    }
    useEffect(()=>{
        getDoctor()
    },[])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={isloaing} />
            <SearchComponent callback={getDoctor} textchange={changeSearchFilter}/>
            <Text style={[Fontsize.medium, { margin: 20 }]}>{spec_label} Doctors</Text>
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Doctors', data: doctors
                    },
                ]}
                renderItem={({ item }) => <DoctorItem action={()=>{navigate(item)}} info={item} />}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
})

export default DoctorGallery