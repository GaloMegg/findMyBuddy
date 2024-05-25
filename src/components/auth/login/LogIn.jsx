import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Toast } from 'toastify-react-native';
import { SCREENS_CONSTANTS } from '~/components/navigator/authNavigation/helper.js';
import { AUTH } from '../../../clients/firebase.app';
import { loginWithEmailAndPassword } from '../../../clients/firebase.auth';
import { insertSession } from '../../../clients/sqlDataBase';
import { setUser } from '../../../store/features/userSlice.slice';
import { COLORS, LOGIN_IMAGE } from '../../../utils/constants';
import ActionButton from '../../styledComponents/ActionButton';
import Link from '../../styledComponents/Link';
import TextInputCustom from '../../styledComponents/TextInputCustom';

/**
 * Renders the LogIn component, which is a form for signing in with email and password.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.email - The email of the user.
 * @param {string} props.password - The password of the user.
 * @param {function} props.setUserDataHandler - The function to update user data.
 * @param {Object} props.route - The route object.
 * @param {Object} props.navigation - The navigation object.
 * @return {JSX.Element} The rendered LogIn component.
 */
const LogIn = ({ email, password, setUserDataHandler, route, navigation }) => {
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  return (
    <ScrollView automaticallyAdjustKeyboardInsets style={styles.container} accessible={false} contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      gap: 10
    }}>
      <Image style={{ width: 200, height: 200 }} source={{ uri: LOGIN_IMAGE }} />

      <View style={styles.inputs} >
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
          secureTextEntry={true}
          value={password}
          error={errors['password']}
        />
        {/* Sign up button */}
        <View style={{ width: '80%', display: 'flex', flexDirection: 'row', gap: 10 }}>
          <ActionButton
            text={'Log in'}
            loading={loading}
            disabled={loading}
            onPress={async (e) => {
              try {
                setLoading(true)
                const owner = await loginWithEmailAndPassword(email, password);
                const ownerId = owner.user.uid
                dispatch(setUser({ ownerId }));
                await insertSession(ownerId)
              } catch (error) {
                if (error.cause) {
                  setErrors(error.cause)
                } else {
                  if (error.message.includes('auth/invalid-credential')) {
                    setErrors({ email: 'Invalid email or password' })
                    return
                  }
                  if (
                    error.message.includes('auth/too-many-requests')
                  ) {
                    Toast.error('Too many requests')
                    setErrors({ email: 'Change your password. Check your inbox.' })
                    await sendPasswordResetEmail(AUTH, email)
                    return
                  }
                  Toast.error(error.message)
                }
              } finally {
                setLoading(false)
              }
            }}
          >

          </ActionButton>
        </View>

      </View>

      <Link
        onPress={() => {
          navigation.replace(SCREENS_CONSTANTS.SIGN_UP);
        }}
      >
        Don't have an account?
      </Link>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.WHITE,
    display: 'flex',
    flexDirection: 'column',
  },
  inputs: {
    display: 'flex',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15,
    width: '80%',
  }
});
