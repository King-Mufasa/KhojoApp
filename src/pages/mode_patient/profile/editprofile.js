import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, ScrollView } from 'react-native'
import Colors from '../../../styles/color'
import Fontsize from '../../../styles/fontsize'
import BadgeButton from '../../../components/badgebtn'
import { screenWidth } from '../../../module/IntroSlider/src/themes'
import KButton from '../../../components/KButton'
import ImagePicker from 'react-native-image-crop-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RadioButton } from 'react-native-paper';
import APIkit from '../../../api/apikit'
import { dispatch, useGlobalState } from '../../../store/state';
import Images from '../../../styles/images'
import FormData from 'form-data'
import Modal from "react-native-modal";
import ModalContent from '../../../components/modalcontent'
import AwesomeLoading from 'react-native-awesome-loading';
import { StandardStyles } from '../../../styles/standardstyles'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Accordion from 'react-native-collapsible/Accordion'
import * as Animatable from 'react-native-animatable';
import { View, Image } from 'react-native-animatable'
import Languages from '../../../assets/array/language'
import Specialization from '../../../assets/array/spec'
import Snackbar from 'react-native-snackbar';
class EditView extends React.Component {
    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <Text style={[Fontsize.small, { marginTop: 20, color: Colors.lightdark, marginBottom: 5 }]}>{this.props.label}</Text>
                <TextInput
                    style={[styles.input, Fontsize.small]}
                    // keyboardType={this.props.type}
                    maxLength={20}
                    value={this.props.value ? this.props.value : null}
                    onChangeText={this.props.onChangeText}
                />
            </SafeAreaView>
        )
    }
}
const gender = [
    {
        label: 'Male'
    },
    {
        label: 'Female'
    }
];




const EditProfile = () => {
    const [user] = useGlobalState('user');
    const [doctormode] = useGlobalState('doctormode')
    const { email, name, image, gender } = user;
    // const { token } = useGlobalState('token');
    const [tempname, setTempName] = useState(name)
    const [tempemail, setTempEmail] = useState(email)
    const [tempimage, setTempImage] = useState(image)
    const [tempgender, setTempGender] = useState(gender)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalmessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [selectedlanguage, setLanguage] = useState([])
    const [selectedspec, setSpec] = useState()
    const [activeFilter, setActiveFilter] = useState([])

    const [clinicPrice, setClinicPrice] = useState('')
    const [homePrice, setHomePrice] = useState('')
    const [videoPrice, setVideoPrice] = useState('')
    const [licenseYear, setLicenseYear] = useState("2021")
    const [licenseNumber, setLicenseNumber] = useState('')
    const [clinicName, setClinicName] = useState('')
    const [clinicAddress, setClinicAddress] = useState('')

    const LanguageFilter = [
        {
            name: 'Language',
            id: -1,
            children: Languages
        }
    ]
    const SpecializationFilter = [
        {
            name: 'Specialization',
            id: -2,
            children: Specialization

        }
    ]
    const changeLanguage = (selectedItems) => {
        setLanguage(selectedItems)
    }
    const changeSpec = (selectedItems) => {
        setSpec(selectedItems)
    }

    const onChangeClinic = (price) => {
        setClinicPrice(price.replace(/[^0-9]/g, ''))
    }

    const onChangeHome = (price) => {
        setHomePrice(price.replace(/[^0-9]/g, ''))
    }

    const onChangeVideo = (price) => {
        setVideoPrice(price.replace(/[^0-9]/g, ''))
    }

    const validate = () => {
        let errorMsg = ''
        if (clinicName === null || clinicName.length === 0)
            errorMsg = "Please input Clinic Name"
        else if (clinicAddress === null || clinicAddress.length === 0)
            errorMsg = "Please input Clinic Address"
        else if (licenseNumber === null || licenseNumber.length === 0)
            errorMsg = "Please input License Number"
        else if (licenseYear === null || licenseYear.length === 0)
            errorMsg = "Please input License Year"
        else if (clinicPrice === null || clinicPrice === 0)
            errorMsg = "Please input Clinic visit price"
        else if (homePrice === null || homePrice === 0)
            errorMsg = "Please input Home visit price"
        else if (videoPrice === null || videoPrice === 0)
            errorMsg = "Please input Video consultation price"
        if (errorMsg === '')
            return true
        Snackbar.show({
            text: errorMsg,
            duration: Snackbar.LENGTH_SHORT
        })
        return false
    }

    const onChangeLicenseYear = (year) => {
        if (parseInt(year) < 2021) {
            setLicenseYear(year)
        }
    }

    const SECTIONS = [
        {
            title: 'My Language',
            content: 'Select Language',
            filter: LanguageFilter,
            selected: selectedlanguage,
            change: changeLanguage
        },
        {
            title: 'My Specialization',
            content: 'Select Specialization',
            filter: SpecializationFilter,
            selected: selectedspec,
            change: changeSpec
        },
    ];


    const setName = name => {
        dispatch({
            type: "setName",
            name: name
        })
    }

    const setGender = gender => {
        dispatch({
            type: 'setGender',
            gender: gender
        })
    }


    const cropImage = () => {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true
        }).then(image => {

            setTempImage({
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
            }
            )

        });
    }
    const PostProfile = () => {
        if (validate()&&doctormode || !doctormode ) {
            setLoading(true)
            const onSuccess = ({ data }) => {
                console.log(data)
                dispatch({
                    type: 'setEmail',
                    email: tempemail
                })
                dispatch({
                    type: 'setName',
                    name: tempname
                })
                dispatch({
                    type: 'setImage',
                    image: tempimage
                })
                dispatch({
                    type: 'setGender',
                    gender: tempgender
                })
                setModalShow(true)
                setModalmessage(data.message)
                setLoading(false)
            }
            const onFailue = data => {
                console.log(data)
                setModalShow(true)
                setModalmessage(data.message)
                setLoading(false)
            }

            var data = new FormData()
            data.append("name", tempname)
            data.append('gender', tempgender)
            data.append('email', tempemail)
            data.append("image",
                {
                    uri: tempimage.uri,
                    type: 'image/jpeg',
                    name: 'userprofile.jpeg'
                })

            // if (doctormode) {

            //     data.append("language", JSON.stringify(selectedlanguage))
            //     data.append("spec", JSON.stringify(selectedspec))
            //     data.append("sub_name", clinicName)
            //     data.append("sub_address", clinicAddress)
            //     data.append("license_num", licenseNumber)
            //     data.append("license_year", licenseYear)
            //     data.append("rate_clinic", clinicPrice)
            //     data.append("rate_home", homePrice)
            //     data.append("rate_video", videoPrice)
            // }
            console.log(data)
            APIkit.post('customer.profile.update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(onSuccess).catch(onFailue)
        }

    }
    const onConfirm = () => {

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
                style={[{ backgroundColor: (isActive ? Colors.lightblue : Colors.primaryBack) }, styles.multiselect]}>
                <Text style={[styles.headerText, Fontsize.small, { color: Colors.lightdark }]}>{section.title}</Text>

            </Animatable.View>
        );
    }

    const _renderContent = (section) => {
        return (
            <View style={styles.content}>
                <SectionedMultiSelect
                    items={section.filter}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    subKey="children"
                    selectText={section.content}
                    showDropDowns={false}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={section.change}
                    onConfirm={onConfirm}
                    selectedItems={section.selected}
                />
            </View>
        );
    };

    const _updateSections = (activeSections) => {
        setActiveFilter(activeSections);
    };
    useEffect(() => {
        setLoading(false)
        setModalShow(false)
        console.log(user)
    }, [])
    return (
        <View >
            <AwesomeLoading indicatorId={17} size={100} isActive={loading} text="loading" />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Modal
                        testID={'modal'}
                        isVisible={modalshow}
                        onSwipeComplete={() => setModalShow(false)}
                        swipeDirection={['up', 'left', 'right', 'down']}
                        style={styles.view}>
                        <ModalContent onPress={() => setModalShow(false)} message={modalmessage} />
                    </Modal>
                    <Text style={Fontsize.medium}>Edit Profile</Text>
                    <SafeAreaView style={[StandardStyles.commonview, styles.subcontainer]}>
                        <Image source={{ uri: (tempimage != null ? tempimage.uri : Images.default_symbol) }} style={styles.avatar} openPicker={cropImage} />
                        <BadgeButton name="Edit Avatar" click={cropImage} style={{ width: screenWidth * 0.4, alignSelf: "center" }} />
                        <SafeAreaView style={styles.namearea}>
                            <EditView label="Name" style={styles.name} onChangeText={(value) => { setTempName(value) }} value={tempname} />
                        </SafeAreaView>
                        <View style={styles.genderarea}>
                            <View style={styles.gender}>
                                <Text style={styles.label}>Male</Text>
                                <RadioButton
                                    value="1"
                                    status={tempgender === '1' ? 'checked' : 'unchecked'}
                                    onPress={() => setTempGender('1')}
                                    style={
                                        { width: 300 }
                                    }
                                />
                            </View>
                            <View style={styles.gender}>
                                <Text style={styles.label}>Female</Text>
                                <RadioButton
                                    value="0"
                                    status={tempgender === '0' ? 'checked' : 'unchecked'}
                                    onPress={() => setTempGender('0')}
                                    color={Colors.danger}
                                />
                            </View>
                        </View>

                        <EditView label="Email" value={tempemail} onChangeText={(value) => { setTempEmail(value) }} />
                        {/* <EditView label="Mobile Number" /> */}

                        {doctormode ?
                            <View>
                                <Accordion
                                    sections={SECTIONS}
                                    activeSections={activeFilter}
                                    renderSectionTitle={_renderSectionTitle}
                                    renderHeader={_renderHeader}
                                    renderContent={_renderContent}
                                    onChange={_updateSections}
                                    underlayColor={Colors.white}
                                />
                                <EditView label="Clinic (Hospital) Name" value={clinicName} onChangeText={(value) => { setClinicName(value) }} />
                                <EditView label="Clinic (Hospital) Address" value={clinicAddress} onChangeText={(value) => { setClinicAddress(value) }} />
                                <EditView label="License Number" value={licenseNumber} onChangeText={(value) => { setLicenseNumber(value) }} />
                                <EditView label="License Year" value={licenseYear} onChangeText={(value) => { onChangeLicenseYear(value) }} />
                                <View style={styles.layoutFee}>
                                    {/* <Icon name="currency-inr" size={40}/> */}
                                    <EditView label="Clinic Visit Price" value={clinicPrice} onChangeText={(value) => { onChangeClinic(value) }} number={true} />
                                    <EditView label="Home Visit Price" value={homePrice} onChangeText={(value) => { onChangeHome(value) }} number={true} />
                                    <EditView label="Video Consultation Price" value={videoPrice} onChangeText={(value) => { onChangeVideo(value) }} number={true} />
                                </View>
                            </View> : <></>
                        }
                        <KButton name="Save" style={{ width: "100%", marginTop: 40 }} click={PostProfile} />
                    </SafeAreaView>
                </ScrollView>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({

    container: {
        // flex: 1,
        padding: 20,
        backgroundColor: Colors.primaryBack
    },
    subcontainer: {
        backgroundColor: Colors.white,
        padding: 20,
        marginTop: 20,
        flexDirection: 'column'
    },
    avatar: {
        width: screenWidth * 0.4,
        height: screenWidth * 0.4,
        borderRadius: 10,
        alignSelf: "center"
    },
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightgrey,
        paddingHorizontal: 20,

    },
    namearea: {
        flexDirection: 'row',
        marginTop: 20
    },
    name: {
        width: '100%',
    },
    genderarea: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        alignItems: 'flex-start',
        width: '45%',
        justifyContent: 'space-between',
        marginTop: 20,
        marginLeft: 20
    },
    gender: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    label: {
        alignSelf: 'center'
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    multiselect: {
        padding: 10,
        borderRadius: 10,
        borderColor: Colors.lightgrey,
        borderWidth: 1,
        marginTop: 20,

    },
    layoutFee: {
        padding: 10,
        borderColor: Colors.lightgrey,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
    }

})

export default EditProfile