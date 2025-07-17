import React, { useEffect, useRef, useState } from 'react';
import { Text, Animated, StyleSheet } from 'react-native';

export default function Error({ message, show }) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState(show);

    useEffect(() => {
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setVisible(false));
        }, 3000);

        return () => clearTimeout(timer);
    }, [fadeAnim]);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.text}>{message || 'Something went wrong!'}</Text>
        </Animated.View>
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
