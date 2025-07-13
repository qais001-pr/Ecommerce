import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faHeart, faShoppingCart, faUser, faBox } from '@fortawesome/free-solid-svg-icons';
// Import screen components
import Home from './home';
// Import Order Screen
import OrdersScreen from './order';
// Import Wishlist Screen
// import WishlistScreen from './wishlist';
// Import Cart Screen
import CartScreen from './card';
// Import Profile Screen
import ProfileScreen from './profile';
// Import Wishlist Screen
import WishlistScreen from './whishlists';
import Whishlist from './whishlists';
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#17301C',
                tabBarLabel: route.name === 'homeScreen' ? 'Home' :
                    route.name === 'whishlist' ? 'Wishlist' :
                        route.name === 'Cart' ? 'Cart' :
                            route.name === 'Orders' ? 'Orders' :
                                route.name === 'Profile' ? 'Profile' : '',
                tabBarIconStyle: {
                    color: '#000',
                    fontSize: 20,
                },
                tabBarActiveBackgroundColor: '#f8e8c3',
                tabBarInactiveBackgroundColor: '#c8d8b3',
                tabBarActiveTintColor: '#17301C',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    opacity: 0.9,
                    position: 'absolute',
                    shadowOpacity: 0.25,
                    shadowRadius: 3.5,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -3,
                    },
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#f8f8f8',
                    borderTopWidth: 0,
                    elevation: 5,
                },
                tabBarIcon: ({ color, size }) => {
                    let icon;

                    switch (route.name) {
                        case 'homeScreen':
                            icon = faHouse;
                            break;
                        case 'whishlist':
                            icon = faHeart;
                            break;
                        case 'Cart':
                            icon = faShoppingCart;
                            break;
                        case 'Orders':
                            icon = faBox;
                            break;
                        case 'Profile':
                            icon = faUser;
                            break;
                        default:
                            icon = faHouse;
                            break;
                    }

                    return (
                        <FontAwesomeIcon icon={icon} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen name="homeScreen" component={Home} />
            <Tab.Screen name="Orders" component={OrdersScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="whishlist" component={Whishlist} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
