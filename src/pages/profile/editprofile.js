import React, { useEffect, useState } from 'react'
import { SafeAreaView, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import Colors from '../../styles/color'
import Fontsize from '../../styles/fontsize'
import BadgeButton from '../../components/badgebtn'
import { screenWidth } from '../../module/IntroSlider/src/themes'
import KButton from '../../components/KButton'
import ImagePicker from 'react-native-image-crop-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import APIkit from '../../api/apikit'
import { dispatch, useGlobalState } from '../../store/state';
import Images from '../../styles/images'
import FormData from 'form-data'
import Modal from "react-native-modal";
import ModalContent from '../../components/modalcontent'
class EditView extends React.Component {
    render() {
        return (
            <SafeAreaView style={this.props.style}>
                <Text style={[Fontsize.small, { marginTop: 20 }]}>{this.props.label}</Text>
                <TextInput
                    style={[styles.input, Fontsize.small]}
                    keyboardType={this.props.type}
                    maxLength={20}
                    value={this.props.value ? this.props.value : ""}
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
    const { email, name, image, gender } = user;
    // const { token } = useGlobalState('token');
    const [tempname, setTempName] = useState(name)
    const [tempemail, setTempEmail] = useState(email)
    const [tempimage, setTempImage] = useState(image)
    const [tempgender, setTempGender] = useState(gender)
    const [modalshow, setModalShow] = useState(false)
    const [modalmessage, setModalmessage] = useState("")
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
            console.log(data)

        }
        const onFailue = data => {
            setModalShow(true)
            setModalmessage(data.message)
            console.log(data)
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

        console.log(APIkit.defaults.headers)
        APIkit.post('customer.profile.update', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(onSuccess).catch(onFailue)

    }


    useEffect(() => {
        console.log(tempemail)
    }, [tempemail]);
    useEffect(() => {
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Modal
                testID={'modal'}
                isVisible={modalshow}
                onSwipeComplete={() => setModalShow(false)}
                swipeDirection={['up', 'left', 'right', 'down']}
                style={styles.view}>
                <ModalContent onPress={() => setModalShow(false)} message={modalmessage}/>
            </Modal>
            {/* <Modal
                isVisible={modalshow}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="left"
            >
                <View style={{ flex: 1 }}>
                    <Text>{modalmessage}</Text>
                </View>
            </Modal> */}
            <Text style={Fontsize.medium}>Edit Profile</Text>
            <SafeAreaView style={styles.subcontainer}>
                <Image source={{ uri: (image != null ? image.uri : Images.default_symbol) }} style={styles.avatar} openPicker={cropImage} />
                <BadgeButton name="edit" click={cropImage} />
                <SafeAreaView style={styles.namearea}>
                    <EditView label="Name" style={styles.name} onChangeText={(value) => { setTempName(value) }} value={tempname} />
                </SafeAreaView>
                <View style={styles.genderarea}>
                    <View style={styles.gender}>
                        <Text style={styles.label}>Male</Text>
                        <RadioButton
                            value="m"
                            status={tempgender === 'm' ? 'checked' : 'unchecked'}
                            onPress={() => setTempGender('m')}
                            style={
                                { width: 300 }
                            }
                        />
                    </View>
                    <View style={styles.gender}>
                        <Text style={styles.label}>Female</Text>
                        <RadioButton
                            value="f"
                            status={tempgender === 'f' ? 'checked' : 'unchecked'}
                            onPress={() => setTempGender('f')}
                            color={Colors.danger}
                        />
                    </View>
                </View>

                <EditView label="Email" value={tempemail} onChangeText={(value) => { setTempEmail(value) }} />
                {/* <EditView label="Mobile Number" /> */}
                <KButton name="Save" style={{ width: "100%", marginTop: 40 }} click={PostProfile} />
            </SafeAreaView>
        </SafeAreaView >
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.primaryBack
    },
    subcontainer: {
        backgroundColor: Colors.white,
        padding: 20,
        marginTop: 20
    },
    avatar: {
        width: screenWidth * 0.2,
        height: screenWidth * 0.2,
        borderRadius: 10
    },
    input: {
        width: "100%",
        marginTop: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colors.lightdark,
        paddingHorizontal: 20
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

})

export default EditProfile