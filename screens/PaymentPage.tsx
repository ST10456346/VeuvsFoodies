import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const PaymentPage = ({ route, navigation }) => {
  const { reservedDishes, totalPrice } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const VAT_RATE = 0.15; 

  // Calculate the subtotal, VAT, and total
  const calculateVAT = (subtotal) => subtotal * VAT_RATE;
  const calculateTotal = (subtotal, vat) => subtotal + vat;

  const subtotal = totalPrice;
  const vat = calculateVAT(subtotal);
  const total = calculateTotal(subtotal, vat);

  const validatePayment = () => {
    if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
      Alert.alert('Payment Error', 'Please fill in all card details.');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (validatePayment()) {
      Alert.alert('Payment Successful', 'Your payment has been processed successfully!');
      navigation.navigate('Confirmation'); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      <TextInput style={styles.input} placeholder="Name on Card" value={nameOnCard} onChangeText={setNameOnCard} />
      <TextInput style={styles.input} placeholder="Card Number" value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" value={expiryDate} onChangeText={setExpiryDate} />
      <TextInput style={styles.input} placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="numeric" />

      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Subtotal: R{subtotal.toFixed(2)}</Text>
        <Text style={styles.amountText}>VAT (15%): R{vat.toFixed(2)}</Text>
        <Text style={styles.amountText}>Total: R{total.toFixed(2)}</Text>
      </View>

      <Button title="Pay Now" onPress={handlePayment} color="#4CAF50" />
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2C2C2C',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF',
  },
});
