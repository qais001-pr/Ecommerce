/* eslint-disable curly */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Error({ message }) {
    if (!message) return null; // Do not render if no message

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#911a1aff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        zIndex: 9999,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
