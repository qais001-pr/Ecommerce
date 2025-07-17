/* eslint-disable quotes */
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    safeareaview: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
    },
    icon: {
        color: 'brown',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#98c792ff',
        elevation: 10,
    },
    headerText: {
        fontSize: 26,
        marginLeft: 10,
        fontWeight: 'bold',
        color: '#095e48ff',
    },
    gridContainer: {
        marginTop: 6,
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        justifyContent: 'space-between', // Space between items in a row
        marginBottom: 15, // Space between rows
    },
    itemWrapper: {
        flex: 1,
        marginHorizontal: 5,
        // Optional: fixed height or aspect ratio for consistent card sizes
        // height: 250,
    },
    modalView: {
        flex: 1,
        backgroundColor: '#bbba',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    modalContent: {
        width: '90%',
        height: '90%',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

})