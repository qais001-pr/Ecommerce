/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable curly */
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RNFS from 'react-native-fs';

import {
    faUserPlus,
    faCamera,
    faUser,
    faPhone,
    faCircle,
    faDotCircle,
    faEnvelope,
    faLock,
    faHome,
    faSignInAlt,
    faVolumeHigh,
    faMinimize
} from '@fortawesome/free-solid-svg-icons';

const Signup = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        contactno: '',
        gender: 'male',
        email: '',
        password: '',
        localaddress: '',
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission',
                    message: 'App needs access to your storage to upload photos',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleImageUpload = async () => {
        try {
            if (Platform.OS === 'android') {
                const hasPermission = await requestCameraPermission();
                if (!hasPermission) {
                    Alert.alert('Permission required', 'Storage permission is needed to select images');
                    return;
                }
            }

            const image = await ImagePicker.openPicker({
                width: 500,
                height: 500,
                cropping: true,
                compressImageQuality: 0.7,
                mediaType: 'photo',
            });

            if (image.size > 5 * 1024 * 1024) {
                Alert.alert('Error', 'Image size must be less than 5MB');
                return;
            }

            const result = await convertImageToBinary(image.path);
            const { imageExtension, mimeType, base64String } = result;
            console.log(imageExtension, mimeType, base64String);
            const dataUrl = `data:${mimeType};base64,${base64String}`;
            console.log(dataUrl);
            const fileExtension = image.path.split('.').pop().toLowerCase();
            if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
                Alert.alert('Error', 'Only JPG/JPEG/PNG images are allowed');
                return;
            }
            setFormData({ ...formData, image });
        } catch (error) {
            if (error.message !== 'User cancelled image selection') {
                Alert.alert('Error', 'Failed to select image. Please try again.');
            }
        }
    };

    async function convertImageToBinary(imagePath) {
        try {
            // Remove 'file://' prefix if needed (on Android, the path will have the 'file://' prefix)
            const filePath = imagePath.startsWith('file://') ? imagePath.slice(7) : imagePath;

            // Read file as base64 string
            const base64String = await RNFS.readFile(filePath, 'base64');

            // Extract file extension
            const imageExtension = imagePath.split('.').pop().toLowerCase();

            // Determine mime type based on file extension (could add more extensions if needed)
            let mimeType = '';
            switch (imageExtension) {
                case 'jpg':
                case 'jpeg':
                    mimeType = 'image/jpeg';
                    break;
                case 'png':
                    mimeType = 'image/png';
                    break;
            }
            // For debug purposes
            // console.log('Image Extension:', fileExtension);
            // console.log('image Content', mimeType);
            return {
                imageExtension,
                mimeType,
                base64String,
            };
        } catch (err) {
            console.error('Error reading file:', err);
        }
    }
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.contactno.trim()) newErrors.contactno = 'Contact number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';
        if (!formData.localaddress.trim()) newErrors.localaddress = 'Address is required';
        if (!formData.image) newErrors.image = 'Profile image is required';

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (formData.contactno && !/^\d{10,15}$/.test(formData.contactno)) {
            newErrors.contactno = 'Contact number must be 10-15 digits';
        }

        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('contactno', formData.contactno);
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('localaddress', formData.localaddress);

            if (formData.image) {
                formDataToSend.append('image', {
                    uri: formData.image.path,
                    type: formData.image.mime,
                    name: `profile_${Date.now()}.${formData.image.path.split('.').pop()}`
                });
            }

            const response = await axios.post('https://your-api.com/signup', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                Alert.alert('Success', 'Account created successfully!');
                navigation.navigate('Login');
            } else {
                throw new Error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Error', error.response?.data?.message || error.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.safeArea}>
            <View style={[styles.header, { flexDirection: 'row' }]}>
                <FontAwesomeIcon icon={faUserPlus} size={30} color="#fff" style={styles.headerIcon} />
                <Text style={styles.headerText}>Create Account</Text>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formContainer}>
                    {/* Profile Image Upload */}
                    <View style={styles.imageUploadContainer}>
                        <TouchableOpacity
                            style={styles.imageUploadButton}
                            onPress={handleImageUpload}
                        >
                            {formData.image ? (
                                <Image source={{ uri: formData.image.path }} style={styles.profileImage} />
                            ) : (
                                <View style={styles.profilePlaceholder}>
                                    <FontAwesomeIcon icon={faCamera} size={30} color="#555" />
                                    <Text style={styles.uploadText}>Add Profile Photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
                    </View>

                    {/* Form Fields */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={[styles.inputContainer, errors.name && styles.inputError]}>
                            <FontAwesomeIcon icon={faUser} size={18} color="#777" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="John Doe"
                                value={formData.name}
                                onChangeText={(text) => setFormData({ ...formData, name: text })}
                            />
                        </View>
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contact Number</Text>
                        <View style={[styles.inputContainer, errors.contactno && styles.inputError]}>
                            <FontAwesomeIcon icon={faPhone} size={18} color="#777" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="+1 234 567 8900"
                                keyboardType="phone-pad"
                                value={formData.contactno}
                                onChangeText={(text) => setFormData({ ...formData, contactno: text })}
                            />
                        </View>
                        {errors.contactno && <Text style={styles.errorText}>{errors.contactno}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.radioGroup}>
                            <TouchableOpacity
                                style={[styles.radioButton, formData.gender === 'male' && styles.radioButtonSelected]}
                                onPress={() => setFormData({ ...formData, gender: 'male' })}
                            >
                                <FontAwesomeIcon
                                    icon={formData.gender === 'male' ? faDotCircle : faCircle}
                                    size={16}
                                    color={formData.gender === 'male' ? '#fff' : '#555'}
                                    style={styles.radioIcon}
                                />
                                <Text style={formData.gender === 'male' ? styles.radioButtonTextSelected : styles.radioButtonText}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.radioButton, formData.gender === 'female' && styles.radioButtonSelected]}
                                onPress={() => setFormData({ ...formData, gender: 'female' })}
                            >
                                <FontAwesomeIcon
                                    icon={formData.gender === 'female' ? faDotCircle : faCircle}
                                    size={16}
                                    color={formData.gender === 'female' ? '#fff' : '#555'}
                                    style={styles.radioIcon}
                                />
                                <Text style={formData.gender === 'female' ? styles.radioButtonTextSelected : styles.radioButtonText}>Female</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                            <FontAwesomeIcon icon={faEnvelope} size={16} color="#777" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="example@email.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                            <FontAwesomeIcon icon={faLock} size={18} color="#777" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                secureTextEntry
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                            />
                        </View>
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Address</Text>
                        <View style={[styles.inputContainer, errors.localaddress && styles.inputError, { height: 100 }]}>
                            <FontAwesomeIcon icon={faHome} size={18} color="#777" style={styles.inputIcon} />
                            <TextInput
                                style={[styles.input, { height: 80 }]}
                                placeholder="123 Main St, City, Country"
                                multiline
                                value={formData.localaddress}
                                onChangeText={(text) => setFormData({ ...formData, localaddress: text })}
                            />
                        </View>
                        {errors.localaddress && <Text style={styles.errorText}>{errors.localaddress}</Text>}
                    </View>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faUserPlus} size={18} color="#fff" style={styles.buttonIcon} />
                                <Text style={styles.submitButtonText}>Create Account</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginLink}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('login')}>
                            <Text style={styles.loginLink}> Login <FontAwesomeIcon icon={faSignInAlt} size={14} color="#5c6a37ff" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    header: {
        padding: 20,
        backgroundColor: '#5c6a37ff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerText: {
        marginLeft: 20,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subHeaderText: {
        fontSize: 16,
        color: '#e0e0e0',
    },
    formContainer: {
        paddingHorizontal: 25,
        marginTop: 20,
    },
    imageUploadContainer: {
        alignItems: 'center',
        marginBottom: 25,
    },
    imageUploadButton: {
        width: 120,
        height: 120,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#e0e0e0',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profilePlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadText: {
        marginTop: 5,
        color: '#555',
        fontSize: 12,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        textAlign: 'justify',
        color: '#333',
    },
    inputError: {
        borderColor: '#ff4444bd',
        backgroundColor: '#fff0f0',
    },
    errorText: {
        color: '#ff4444bd',
        fontSize: 12,
        marginTop: 5,
    },
    radioGroup: {
        flexDirection: 'row',
        marginTop: 5,
    },
    radioButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 12,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    radioButtonSelected: {
        backgroundColor: '#94852eff',
        borderColor: '#26220cff',
        borderWidth: 3,
    },
    radioButtonText: {
        color: '#555',
        fontSize: 15,
        fontWeight: '500',
    },
    radioButtonTextSelected: {
        color: '#fff',
        fontSize: 19,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#5c6a37ff',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
    },
    loginText: {
        color: '#666',
    },
    loginLink: {
        color: '#5c6a37ff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Signup;
