/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// {" Splash Screen "}
import Splash from './screens/splash';
// {" Home Screen "}
import Home from './screens/home';
// {Tab Navigation Home}
import TabNavigation from './screens/tabnavigationHome';
//Product Details 
import ProductsDetails from './screens/productdetails';
//Login Screen
import Login from './screens/login';
//SignUp
import Signup from './screens/signup';
export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='splashscreen'>
                <Stack.Screen
                    name="splashscreen"
                    component={Splash}
                    options={{
                        headerShown: false,
                        cardStyleInterpolator: ({ current, next, layouts }) => {
                            return {
                                cardStyle: {
                                    transform: [
                                        {
                                            rotateY: current.progress.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['180deg', '0deg'],
                                            }),
                                        },
                                    ],
                                },
                            };
                        },
                        transitionSpec: {
                            open: {
                                animation: 'timing',
                                config: {
                                    duration: 5000,
                                },
                            },
                            close: {
                                animation: 'timing',
                                config: {
                                    duration: 5000,
                                },
                            },
                        },
                    }}
                />
                <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="tabBottomNav" component={TabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name="productDetails" component={ProductsDetails} options={{
                    headerShown: false,
                    headerTitle: 'Product Details',
                    headerTransparent: true,
                    animation: 'slide_from_right',
                    headerBlurEffect: 'systemMaterialDark',
                    headerTitleAlign: 'center',
                }} />

                <Stack.Screen name="login" component={Login} options={{
                    headerShown: false,
                    headerTitle: 'Product Details',
                    headerTransparent: true,
                    animation: 'slide_from_right',
                    headerBlurEffect: 'systemMaterialDark',
                    headerTitleAlign: 'center',
                }} />
                <Stack.Screen name="signup" component={Signup} options={{
                    headerShown: false,
                    headerTitle: 'Product Details',
                    headerTransparent: true,
                    animation: 'slide_from_right',
                    headerBlurEffect: 'systemMaterialDark',
                    headerTitleAlign: 'center',
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
