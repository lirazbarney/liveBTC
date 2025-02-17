import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

export default function LiveBTCPage({ navigation }: any) {
  const [btcValue, setBtcValue] = useState('0');

  async function getBTCValue() {
    try {
      const { data } = await axios.get(
        'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT'
      );
      setBtcValue(parseFloat(data.price).toString());
    } catch (err: any) {
      Alert.alert(`could not get BTC value (${err.message})`);
    }
  }

  async function handleLogout() {
    try {
      await axios.get('http://192.168.31.9:4000/logout');
      Alert.alert('Logged out! see you soon :)');
      navigation.navigate('authPage');
    } catch (err: any) {
      Alert.alert(`could not log out ${err.message}`);
    }
  }

  setInterval(getBTCValue, 1000);

  return (
    <View>
      <Text>The current value of the bitcoin is: {btcValue}</Text>
      <Button title="log out" onPress={() => handleLogout()} />
    </View>
  );
}
