import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
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
  phoneNumber,
  setUserDataHandler,
  navigation,
}) => {
  const dispatch = useDispatch()
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
