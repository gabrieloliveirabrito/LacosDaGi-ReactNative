import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15
    },
    header: {
        flex: 0.4,
        backgroundColor: "#7d397d",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        paddingBottom: 30,
        color: "white",
    },
    navigateButton: {
        flex: 1,
        marginBottom: 30,
        backgroundColor: "#7d397d",
        justifyContent: "space-around"
    },
    footer: {
        alignItems: "center",
        backgroundColor: "#7d397d"
    }
})