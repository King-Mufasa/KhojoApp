import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import APIkit from '../../api/apikit'
import Spinner from 'react-native-loading-spinner-overlay';
import Images from '../../styles/images'
import Colors from '../../styles/color';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { saveToken } from '../../actions/token';
import { changCount } from '../../actions/count'

const initialState = {
    email: '',
    password: '',
    errors: {},
    isAuthorized: false,
    isLoading: false,
    token: ""
}

class Login extends React.Component {
    state = initialState

    onUsernameChange = email => {
        this.setState({ email })
    }

    onPasswordChange = password => {
        this.setState({ password })
    }

    navigate() {

        const { navigate } = this.props.navigation
        navigate("MyProfile")
    }

    onPressLogin() {
        const { email, password } = this.state
        const payload = { email, password };
        const onSuccess = ({ data }) => {
            this.setState({ isLoading: false, isAuthorized: true })
            let { token, actions } = this.props
            token = data.data.token
            this.setState({ token })
            this.props.saveToken(token)
            APIkit.defaults.headers.common["Authorization"] = 'Bearer '+token
            this.navigate()
        }

        const onFailue = error => {
            console.log(error.response.data)
            this.setState({ errors: error.response.data, isLoading: false })
        }

        this.setState({ isLoading: true })

        APIkit.post('login/', payload).then(onSuccess).catch(onFailue)
    }

    getNonFieldErrorMessage() {
        let message = null;
        const { errors } = this.state;
        if (errors.non_field_errors) {
            message = (
                <View style={styles.errorMessageContainerStyle}>
                    {errors.non_field_errors.map(item => (
                        <Text style={styles.errorMessageTextStyle} key={item}>{item}</Text>
                    ))}
                </View>
            )
        }
        return message
    }
    getErrorMessageByField(field) {
        // Checks for error message in specified field
        // Shows error message from backend
        let message = null;
        if (this.state.errors[field]) {
            message = (
                <View style={styles.errorMessageContainerStyle}>
                    {this.state.errors[field].map(item => (
                        <Text style={styles.errorMessageTextStyle} key={item}>
                            {item}
                        </Text>
                    ))}
                </View>
            );
        }
        return message;
    }

    render() {
        const { isLoading } = this.state;
        return (
            <View style={styles.containerStyle}>
                <Spinner visible={isLoading} />

                {!this.state.isAuthorized ? <View>
                    <View style={styles.logotypeContainer}>
                        <Image
                            source={Images.check}
                            style={styles.logotype}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        // value={this.state.email}
                        maxLength={256}
                        placeholder="Enter username..."
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        onSubmitEditing={event =>
                            this.passwordInput.wrappedInstance.focus()
                        }
                        onChangeText={this.onUsernameChange}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                    />

                    {this.getErrorMessageByField('username')}

                    <TextInput
                        ref={node => {
                            this.passwordInput = node;
                        }}
                        style={styles.input}
                        // value={this.state.password}
                        maxLength={40}
                        placeholder="Enter password..."
                        onChangeText={this.onPasswordChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        blurOnSubmit
                        onSubmitEditing={this.onPressLogin.bind(this)}
                        secureTextEntry
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#999"
                    />

                    {this.getErrorMessageByField('password')}

                    {this.getNonFieldErrorMessage()}

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.onPressLogin.bind(this)}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View> : <View><Text>Successfully authorized!</Text></View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        marginBottom: 32,
    },
    logotypeContainer: {
        alignItems: 'center',
    },
    logotype: {
        maxWidth: 280,
        maxHeight: 100,
        resizeMode: 'contain',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f6f6f6',
    },
    input: {
        height: 50,
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        marginBottom: 20,
    },
    loginButton: {
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
    },
    loginButtonText: {
        color: Colors.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    errorMessageContainerStyle: {
        marginBottom: 8,
        backgroundColor: '#fee8e6',
        padding: 8,
        borderRadius: 4,
    },
    errorMessageTextStyle: {
        color: '#db2828',
        textAlign: 'center',
        fontSize: 12,
    },
})

const mapStateToProps = state => ({
    token: state.token,
})

const mapDispatchToProps = dispatch => {
    return {
        saveToken: (token) => dispatch(saveToken(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);