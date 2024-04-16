import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, View } from 'react-native';
import { loginWithEmailAndPassword } from '../../../clients/firebase.auth';
import { SCREENS_CONSTANTS } from '../../navigator/helper';
import Link from '../../styledComponents/Link';
import Loader from '../../styledComponents/Loader';
import TextInputCustom from '../../styledComponents/TextInputCustom';
/**
 * Component for rendering a sign-up form.
 *
 * The component takes in three properties:
 * 1. name: The name of the user
 * 2. email: The email of the user
 * 3. password: The password of the user
 * 4. setUserDataHandler: A handler function for setting user data. The function
 * takes in two arguments: the name of the property to set and the new value.
 *
 * @param {Props} name - The name of the user
 * @param {Props} email - The email of the user
 * @param {Props} password - The password of the user
 * @param {Props} setUserDataHandler - The handler for setting user data
 * @return {JSX.Element} The sign-up form component
 */
const LogIn = ({ email, password, setUserDataHandler, route, navigation }) => {
  console.log(route, navigation);
  const [loading, setLoading] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ width: '80%' }}>
        {/* Email input */}
        <TextInputCustom
          placeholder="Email"
          value={email}
          onChangeText={(text) => setUserDataHandler('email', text)}
        />
        {/* Password input */}
        <TextInputCustom
          placeholder="Password"
          onChangeText={(text) => setUserDataHandler('password', text)}
          secureTextEntry={true}
          value={password}
        />
        {/* Sign up button */}
        <Button
          title="Log in"
          onPress={async () => {
            const user = await loginWithEmailAndPassword(email, password);
            console.log(user);
          }}
        />
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {['facebook-square', 'google'].map((provider) => {
          if (loading && loading == provider) return <Loader />;
          return (
            <Pressable
              key={provider}
              onPress={() => {
                console.log(provider);
                setLoading(provider);
              }}
            >
              <AntDesign name={provider} size={24} color="black" style={{}} />
            </Pressable>
          );
        })}
      </View>
      <View>
        <Link
          onPress={() => {
            navigation.replace(SCREENS_CONSTANTS.SIGN_UP);
          }}
        >
          Don't have an account?
        </Link>
      </View>
    </View>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,

    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
