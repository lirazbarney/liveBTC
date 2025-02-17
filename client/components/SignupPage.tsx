import axios from 'axios';
import { useState } from 'react';
import { Alert, Button, Text, TextInput } from 'react-native';

export default function SignupPage({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    if (!username || !password) {
      alert('Please enter username and password');
    } else {
      try {
        const { data } = await axios.post('http://192.168.31.9:4000/signup', {
          username,
          password,
        });
        Alert.alert('Sign up successful');
        navigation.navigate('liveBTCPage');
      } catch (error: any) {
        let errorMessage = '';
        if (error.message === 'Request failed with status code 400') {
          errorMessage = 'username already exists';
        } else if (error.message === 'Request failed with status code 500') {
          errorMessage = 'server error';
        } else {
          errorMessage = 'unknown error';
        }
        Alert.alert(`could not sign up - ${errorMessage}`);
      }
    }
  }

  return (
    <>
      <Text>Username</Text>
      <TextInput value={username} onChangeText={setUsername} className="border border-black" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} className="border border-black" />
      <Button title="sign up" onPress={() => handleSignUp()} />
    </>
  );
}
