import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { SCREENS_CONSTANTS } from '~/components/navigator/authNavigation/helper.js';
import { createAccountWithEmailAndPassword } from '../../../clients/firebase.auth';
import OwnerService from '../../../services/owner.service';
import { COLORS, LOGIN_IMAGE } from '../../../utils/constants';
import ActionButton from '../../styledComponents/ActionButton';
import Link from '../../styledComponents/Link';
import TextInputCustom from '../../styledComponents/TextInputCustom';

/**
 * Component for rendering a sign-up form.
 *
 * The component takes in the following properties:
 * - name: The name of the user (string)
 * - email: The email of the user (string)
 * - password: The password of the user (string)
 * - phoneNumber: The phone number of the user (string)
 * - setUserDataHandler: A handler function for setting user data. The function takes in two parameters: prop (string) and value (string), and updates the user data accordingly. (function)
 * - navigation: The navigation object for navigating between screens. (object)
 *
 * @param {Object} props - The properties for the SignUp component.
 * @param {string} props.name - The name of the user.
 * @param {string} props.email - The email of the user.
 * @param {string} props.password - The password of the user.
 * @param {string} props.phoneNumber - The phone number of the user.
 * @param {function} props.setUserDataHandler - The handler function for setting user data.
 * @param {object} props.navigation - The navigation object for navigating between screens.
 * @return {JSX.Element} The rendered SignUp component.
 */
const SignUp = ({
  name,
  email,
  password,
  phoneNumber,
  setUserDataHandler,
  navigation,
}) => {
  const [errors, setErrors] = useState({})
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} automaticallyAdjustKeyboardInsets>
      <View style={styles.inputs}>
        <Image style={{ width: 200, height: 200 }} source={{ uri: LOGIN_IMAGE }} />

        {/* Name input */}
        <TextInputCustom
          label="Name"
          onChangeText={(text) => setUserDataHandler('name', text)}
          value={name}
          error={errors['name']}
        />
        <TextInputCustom
          label="Phone number"
          value={phoneNumber}
          onChangeText={(text) => setUserDataHandler('phoneNumber', text)}
          error={errors['phoneNumber']}
        />
        {/* Email input */}
        <TextInputCustom
          label="Email"
          value={email}
          onChangeText={(text) => setUserDataHandler('email', text)}
          error={errors['email']}
        />

        {/* Password input */}
        <TextInputCustom
          label="Password"
          onChangeText={(text) => setUserDataHandler('password', text)}
          error={errors['password']}
          secureTextEntry={true}
          value={password}
        />
        {/* Sign up button */}

        <ActionButton
          text={'Sign Up'}
          onPress={async () => {
            try {

              const ownerId = await createAccountWithEmailAndPassword(
                email,
                password,
                phoneNumber,
                name
              );
              const ownerService = OwnerService.getInstance();
              await ownerService.create(ownerId, {
                name,
                email,
                location: { latitude: 0, longitude: 0 },
                ownerId: ownerId,
                phoneNumber: '',
              });
              navigation.replace(SCREENS_CONSTANTS.LOG_IN);
            } catch (errors) {
              setErrors(errors);
            }
          }}
        >
        </ActionButton>
        <Link
          onPress={() => {
            navigation.replace(SCREENS_CONSTANTS.LOG_IN);
          }}
        >
          Already have an account?
        </Link>
      </View>

    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    height: '100%',
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    width: '80%',
  }
});
