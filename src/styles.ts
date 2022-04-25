import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

const styles= StyleSheet.create({
    container: {
        borderColor: colors.silver,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: 'space-between',
    },
    numberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    number: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.01,
        color: colors.GREEN_BLUE,
        lineHeight: 38,
        padding: 20,
    },
    textInputContainer: {
        justifyContent: 'center',
        margin: 20,
        height: 38,
        borderRadius: 4,
    },
    textInput: {
        fontSize: 24,
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0.01,
        color: colors.GREEN_BLUE,
        minWidth: 100,
    },
    rightElement: { alignSelf: 'center', marginRight: 23 },
    slider: Platform.select({
        ios: {
            // Negative values to align properly with container, no way around it
            // First one is due to a bug in RN slider
            marginHorizontal: -3,
            marginTop: -20,
        },
        android: {
            // Negative values to align properly with container, no way around it
            // First one is due to a bug in RN slider
            marginHorizontal: -15,
            marginTop: -10,
        },
    }),
});
export default styles;