/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import configureStore from './src/store/configueStore';
import { Provider } from 'react-redux';

const store = configureStore()
export default function Main() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </SafeAreaProvider>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
