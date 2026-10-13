import {StyleSheet} from "react-native";

export const listStyles = StyleSheet.create({
    elContainer: {
        paddingHorizontal: 5,
        paddingTop: 10,
        flexDirection: "row"
    },
    titleImg: {
        width: 122,
        height: 173,
        objectFit: "contain",
        borderRadius: 10
    },
    details: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 18,
        textOverflow: 'elipsis',
        overflow: 'hidden',
        color: '#95b6d0'
    },
    infoText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, .6)'
    },
    infoEl: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    icon: {
        height: 25,
        width: 25,
        paddingTop: 5,
        paddingRight: 10,
        borderRadius: 5
    }
});