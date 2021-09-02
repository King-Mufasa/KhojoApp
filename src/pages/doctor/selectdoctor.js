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

const initialState = {
    search_filter: '',
    errors: {},
    doctors: {},
    isLoading: false,
    token: ""
}


class DoctorGallery extends React.Component {
    state = initialState
    changeSearchFilter = search_filter => {
        this.setState({ search_filter })
        this.getDoctor()
    }

    getDoctor() {
        const { search_filter } = this.state
        console.log(this.state)
        const keyword = { filter_name: search_filter };
        const onSuccess = ({ data }) => {
            this.setState({ doctors: data, isLoading: false  })

        }
        const onFailue = error => {
            console.log(error.response.data)
            this.setState({ errors: error.response.data, isLoading: false })
        }

        this.setState({ isLoading: true })
        APIkit.post('customer.getDoctor/', keyword).then(onSuccess).catch(onFailue)
    }
    navigate = () =>{
        const {navigate} = this.props.navigation
        navigate('Schedule')
    }
    render() {
        const { isLoading } = this.state;
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
                    renderItem={({ item }) => <DoctorItem click={this.navigate} info={item} />}
                    keyExtractor={(item, index) => index}
                />
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
})

export default DoctorGallery