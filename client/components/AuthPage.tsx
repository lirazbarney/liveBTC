import { Button, View } from 'react-native';

export default function AuthPage({ navigation }: any) {
  return (
    <>
      <View>
        <Button onPress={() => navigation.navigate('signupPage')} title="Sign Up" />
        <Button onPress={() => navigation.navigate('loginPage')} title="Log in" />
      </View>
    </>
  );
}
