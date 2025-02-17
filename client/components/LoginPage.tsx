import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';

export default function LoginPage({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!username || !password) {
      alert('Please enter username and password');
    } else {
      try {
        const { data } = await axios.post('http://192.168.31.9:4000/login', { username, password });
        console.log(data);

        Alert.alert('Log in successful');
        navigation.navigate('liveBTCPage');
      } catch (error: any) {
        let errorMessage = '';
        if (error.message === 'Request failed with status code 401') {
          errorMessage = 'Invalid username or password';
        } else if (error.message === 'Request failed with status code 500') {
          errorMessage = 'Server error';
        } else {
          errorMessage = 'unknown error';
        }
        Alert.alert(`could not log in - ${errorMessage}`);
      }
    }
  }

  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} className="border border-black" />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} className="border border-black" />
      <Button onPress={() => handleLogin()} title="Log in" />
    </View>
  );
}
