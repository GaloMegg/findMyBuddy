import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SCREENS_CONSTANTS } from '~/components/navigator/authNavigation/helper.js';
import { createAccountWithEmailAndPassword } from '../../../clients/firebase.auth';
import OwnerService from '../../../services/owner.service';
import { setUser } from '../../../store/features/userSlice.slice';
import Link from '../../styledComponents/Link';
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
const SignUp = ({
  name,
  email,
  password,
  setUserDataHandler,
  route,
  navigation,
}) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>

        {/* Name input */}
        <TextInputCustom
          label="Name"
          onChangeText={(text) => setUserDataHandler('name', text)}
          value={name}
        />
        {/* Email input */}
        <TextInputCustom
          label="Email"
          value={email}
          onChangeText={(text) => setUserDataHandler('email', text)}
        />
        {/* Password input */}
        <TextInputCustom
          label="Password"
          onChangeText={(text) => setUserDataHandler('password', text)}
          secureTextEntry={true}
          value={password}
        />
        {/* Sign up button */}
        <Button
          title="Sign Up"
          onPress={async () => {
            try {
              const ownerId = await createAccountWithEmailAndPassword(
                email,
                password
              );
              console.log(ownerId)
              const ownerService = OwnerService.getInstance();
              const created = await ownerService.create(ownerId, {
                name,
                email,
                location: { latitude: 0, longitude: 0 },
                ownerId: ownerId,
                phoneNumber: '',
              });
              console.log(created)
              dispatch(setUser({ ownerId: created.ownerId }))
            } catch (error) {
              console.error(error)
            }
          }}
        />
      </View>

      <View>
        <Link
          onPress={() => {
            navigation.replace(SCREENS_CONSTANTS.LOG_IN);
          }}
        >
          Already have an account?
        </Link>
      </View>
    </View>
  );
};

export default SignUp;

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
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '80%',
  }
});
