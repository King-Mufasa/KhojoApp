import React from 'react'
import KButton from '../components/KButton';
import { View, Image, StyleSheet, Text } from 'react-native'
import GeneralStatusBarColor  from '../styles/statusbar'


export default class Login extends React.Component {
    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GeneralStatusBarColor backgroundColor="#772ea2"
                    barStyle="light-content" />
                <View style={styles.container}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit   App.js</Text>
                    <Text style={styles.instructions}>KILL</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{

    },
    welcome:{

    },
    instructions:{

    }
})