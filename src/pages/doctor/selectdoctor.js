import React from 'react'
import { View, Image } from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, SectionList, Text } from 'react-native'
import Rating from '../../components/rating'
import KButton from '../../components/KButton'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Colors from '../../styles/color'
import SearchComponent from '../../components/search'
import Fontsize from '../../styles/fontsize'
import APIkit from '../../api/apikit'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import DoctorItem from '../../components/doctoritem'
import { useState } from 'react'
import { useEffect } from 'react'
import Languages from '../../assets/array/language'
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Specialization from '../../assets/array/spec'
import { Divider } from 'react-native-paper'
const DoctorGallery = ({route, navigation}) => {
    
    const [search_filter, setSearch] = useState("")
    const [doctors, setDoctor] = useState([])
    const [isloaing, setloading] = useState(false)
    const [selectedlanguage, setLanguage] = useState([])
    const [selectedspec, setSpec] = useState([])
    const [showfilter, showFilter] = useState(true)
    const [activeFilter, setActiveFilter] = useState([])
    
    const changeLanguage = (selectedItems) => {
        setLanguage(selectedItems)
    }
    const changeSpec = (selectedItems) => {
        setSpec(selectedItems)
    }
    const LanguageFilter = [
        {
            name: 'Language',
            id: -1,
            children: Languages
        }
    ]
    const SpecializationFilter = [
        {
            name:'Specialization',
            id:-2,
            children: Specialization

        }
    ]
    const SECTIONS = [
        {
            title: 'Language Filter',
            content: 'Select Language',
            filter:LanguageFilter,
            selected:selectedlanguage,
            change:changeLanguage
        },
        {
            title: 'Spec Filter',
            content: 'Select Specialization',
            filter:SpecializationFilter,
            selected:selectedspec,
            change:changeSpec
        },
    ];
    const changeSearchFilter = search_filter => {
        setSearch(search_filter)
    }
    const getDoctor = () => {
        let refilter = [];
        selectedspec.forEach(element => {
            refilter.push(element%1000)
        });
        const keyword = { filter_name: search_filter,filter_lang:selectedlanguage,filter_spec:refilter };
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
        const { navigate } = navigation
        navigate('Schedule', { doctor: doctor })
    }
 
    const _renderSectionTitle = (section) => {
        return (
            <View style={styles.content}>
            </View>
        );
    };
    const _renderHeader = (section, index, isActive, sections) => {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={[{ backgroundColor: (isActive ? Colors.lightblue : Colors.primaryBack) }, styles.filterheader]}>
                <Text style={[styles.headerText,Fontsize.medium]}>{section.title}</Text>
            </Animatable.View>
        );
    }

    const _renderContent = (section) => {
        console.log(section)
        return (
            <View style={styles.content}>
                <SectionedMultiSelect
                    items={section.filter}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText={section.content}
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={section.change}
                    selectedItems={section.selected}
                />
            </View>
        );
    };

    const _updateSections = (activeSections) => {
        setActiveFilter(activeSections);
    };
    useEffect(() => {
        getDoctor()
    }, [selectedspec,selectedlanguage])
    return (
        <View style={{ backgroundColor: Colors.primaryBack, flex: 1 }}>
            <Spinner visible={isloaing} />
            <SearchComponent callback={getDoctor} textchange={changeSearchFilter} />
            <Accordion
                sections={SECTIONS}
                activeSections={activeFilter}
                renderSectionTitle={_renderSectionTitle}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
            />
            <Divider orientation="horizontal"  insetType="middle" />
            <SectionList
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
                sections={[
                    {
                        title: 'Doctors', data: doctors
                    },
                ]}
                renderItem={({ item }) => <DoctorItem action={() => { navigate(item) }} info={item} />}
                keyExtractor={(item, index) => index}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    filterheader:{
        paddingHorizontal:20,
        paddingVertical:10
    },
    content:{
        paddingHorizontal:20,
        backgroundColor:Colors.lightblue
    },
    headerText:{
        color:Colors.primary
    }
})

export default DoctorGallery