import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    safeareaview: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E1F0C4',
    },
    text: {
        fontSize: 70,
        fontWeight: 'bold',
        fontFamily: 'Sniglet-ExtraBold',
        color: '#55917F',
        marginTop: 100,
    },
    loadercontainer: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default styles;