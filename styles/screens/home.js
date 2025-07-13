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
        padding: 10,
        backgroundColor: '#f8f8f8',
        elevation: 10,
    },
    headerText: {
        fontSize: 26,
        marginLeft: 10,
        fontWeight: 'bold',
        color: 'brown',
    },
    grid: {
        flex: 1,
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundColor: '#fff',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    modalView: {
        flex: 1,
    },
    modalContent: {
        width: '90%',
        height: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})