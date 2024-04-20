import { StyleSheet, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'

const Card = ({ children, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            {children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: colors.Chetsnut,
        height: 40,
        width: 150,
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems:'center'
        /* shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 10, */
      
    }
})