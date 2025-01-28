import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LayoutCustom from '../components/LayoutCustom';
import TextCustom from '../components/TextCustom';

const PaymentConfirmation = ({ navigation, total, date, order }) => {


    return (
        <LayoutCustom >
            <View style={styles.container}> 

            <TextCustom style={styles.confirmationText}>Pago realizado correctamente</TextCustom>

            </View>
            <TextCustom style={styles.amountText}>{total}</TextCustom>
            <TextCustom style={styles.referenceText}>Fecha : {date}</TextCustom>
        </LayoutCustom>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#579F6F',
    },
    confirmationText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    amountText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 10,
    },
    referenceText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default PaymentConfirmation;