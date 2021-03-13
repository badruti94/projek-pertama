import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#e84118',
        padding: 2,
        flexDirection: 'row'
    },
    titleApp: {
        justifyContent: 'space-between',
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
    item: {
        backgroundColor: '#2c3e50',
        marginBottom: 0.5,
        padding: 17,
        flexDirection: 'row',
    },
    itemText: {
        color: '#ecf0f1',
        fontSize: 19,
        marginLeft: 5,
        flexBasis: 250
    },
    buttonWrapper: {
        textAlign: 'right',
        backgroundColor: 'black'
    }
})


export default styles