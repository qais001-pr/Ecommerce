/* eslint-disable eol-last */
/* eslint-disable semi */
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        width: width * 0.85,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    menuItem: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 19,
        color: '#444',
    },
    categoryList: {
        backgroundColor: '#f9f9f9',
        maxHeight: 300,
    },
    categoryItem: {
        paddingVertical: 14,
        paddingHorizontal: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    categoryText: {
        fontSize: 15,
        color: '#555',
    },
    activeCategory: {
        backgroundColor: '#ac8d39ff',
    },
});