import React, { useEffect, useState } from 'react'
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
import PharmacyItem from '../../components/pharmacyitem'

const initialState = {
    search_filter: '',
    errors: {},
    isLoading: false,
}

const PharmacyGallery = (props) => {
    const [filter, setFilter] = useState('')
    const [pharmacy, setPharmacy] = useState({})
    const [loading, setLoading] = useState(false)
    const changeSearchFilter = search_filter => {
        setFilter(search_filter)
        getPathology()
    }
    const getPathology = () => {
        const keyword = { filter_name: filter,vendor:'pharmacy' };
        const onSuccess = ({ data }) => {
            console.log(data)
            setLoading(false)
            setPharmacy(data)
        }
        const onFailue = error => {
            console.log(error.response.data)
            setLoading(false)
        }
        setLoading(true)
        APIkit.post('customer.getVendor/', keyword).then(onSuccess).catch(onFailue)
    }

    const viewDetail = id =>{
        console.log(id)
        const {navigate} = props.navigation
        navigate('RequestOrder', { type: 'pharmacy',vendor_id: id })
        // navigate('PharmacyDetail',{vendor_id:id})
    }

    useEffect(()=>{
        getPathology()
    },[])
    return (
        <SafeAreaView style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={loading} />
            <SearchComponent callback={changeSearchFilter} />
            <Text style={[Fontsize.medium, { margin: 20 }]}>Select Pathology</Text>
            <SectionList
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Pathologys', data: pharmacy
                    },
                ]}
                renderItem={({ item }) => <PharmacyItem info={item} click={()=>{viewDetail(item.id)}}/>}
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

export default PharmacyGallery