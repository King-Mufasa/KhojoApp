/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function Main() {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
