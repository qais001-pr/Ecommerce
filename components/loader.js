/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
const LoaderActivityIndicator = require('../Lotties/Loader.json');
export default function Loader() {
    return (
        <View style={{ flex: 1, position: 'absolute', bottom: 10, alignItems: 'center', justifyContent: 'center' }}>
            <LottieView
                source={LoaderActivityIndicator}
                autoPlay
                loop
                style={{ width: 100, height: 160 }} />
        </View>
    )
}