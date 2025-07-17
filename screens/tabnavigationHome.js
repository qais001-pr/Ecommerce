/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHouse,
    faHeart,
    faShoppingCart,
    faUser,
    faBox,
} from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';
import Home from './home';
import OrdersScreen from './order';
import CartScreen from './card';
import ProfileScreen from './profile';
import WishlistScreen from './whishlists';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarActiveTintColor: '#2C344A',
                tabBarInactiveTintColor: '#A79953',
                tabBarLabelStyle: styles.labelStyle,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabItem,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconSize = focused ? 30 : 22;

                    switch (route.name) {
                        case 'Home':
                            iconName = faHouse;
                            break;
                        case 'Wishlist':
                            iconName = faHeart;
                            break;
                        case 'Cart':
                            iconName = faShoppingCart;
                            break;
                        case 'Orders':
                            iconName = faBox;
                            break;
                        case 'Profile':
                            iconName = faUser;
                            break;
                        default:
                            iconName = faHouse;
                    }

                    return (
                        <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
                            <FontAwesomeIcon
                                icon={iconName}
                                size={iconSize}
                                color={color}
                                style={focused ? styles.activeIcon : styles.icon}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{ tabBarLabel: 'Wishlist' }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarBadgeStyle: styles.badge,
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ tabBarLabel: 'Orders' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        height: 70,
        borderTopWidth: 0,
        backgroundColor: '#F7F7EE',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#2C344A',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        paddingBottom: 5,
    },
    tabItem: {
        paddingVertical: 8,
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: '600',
        paddingBottom: 4,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    activeIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    activeIcon: {
        marginBottom: 4,
    },
    icon: {
        opacity: 0.9,
    },
    badge: {
        backgroundColor: '#A79953',
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
