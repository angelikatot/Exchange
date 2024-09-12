import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchRates } from './api';

export default function App() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const getRates = async () => {
      try {
        const ratesData = await fetchRates();
        setExchangeRates(ratesData.rates);
        setCurrencies(Object.keys(ratesData.rates));
      } catch (error) {
        console.error('Error finding exchange rates:', error);
      }
    };
    getRates();
  }, []);

  const handleConvert = () => {
    if (amount && exchangeRates[currency]) {
      const rate = exchangeRates[currency];
      const result = (parseFloat(amount) / rate).toFixed(2);  //  EUR
      setConvertedAmount(result);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>

        <Image
          source={{ uri: 'https://clipart-library.com/images_k/transparent-money-symbol/transparent-money-symbol-19.jpg' }}
          style={styles.image}
        />


        {convertedAmount && (
          <Text style={styles.result}>
            {amount} {currency} = {convertedAmount} EUR
          </Text>
        )}

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
          />


          <Picker
            selectedValue={currency}
            style={styles.picker}
            onValueChange={(itemValue) => setCurrency(itemValue)}
            mode="dialog"
          >
            {currencies.map((curr) => (
              <Picker.Item key={curr} label={curr} value={curr} />
            ))}
          </Picker>
        </View>


        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    flex: 0.4,
    marginRight: 10,
  },
  picker: {
    flex: 0.5,
  },
  result: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  convertButton: {
    backgroundColor: '#FF69B4',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  convertButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
