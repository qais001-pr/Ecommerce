
/* eslint-disable no-unused-vars */
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const { user, isAuthenticated, loginUser, logout } = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {isAuthenticated && user ? (
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: user.imageBytes }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.name}>{user.gender.toUpperCase()}</Text>
                    <Text style={styles.email}>{user.contactno}</Text>
                    <Text style={styles.email}>{user.localAddress}</Text>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.authContainer}>
                    <Text style={styles.title}>Welcome to Your Profile</Text>
                    <Text style={styles.subtitle}>Please login to view your profile details</Text>

                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={() => navigation.navigate('login')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.signupButton]}
                        onPress={() => navigation.navigate('signup')}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        // backgroundColor: 'white',
        padding: 30,
        // borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    authContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 50,
        marginBottom: 20,
        borderWidth: 4,
        borderColor: '#757419ff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    loginButton: {
        backgroundColor: '#94852eff',
    },
    signupButton: {
        backgroundColor: '#94852eff',
    },
    logoutButton: {
        backgroundColor: '#94852eff',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
