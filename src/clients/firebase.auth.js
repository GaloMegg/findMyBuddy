import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Toast } from 'toastify-react-native';
import { AUTH } from './firebase.app';


/**
 * Creates an account with the given email and password.
 *
 * @param {string} email - the email for the account
 * @param {string} password - the password for the account
 * @param {string} phoneNumber - the phone number for the account
 * @param {string} name - the name for the account
 * @return {Promise<string>} a promise that resolves with the user credential
 * @throws {Error} if the sign up validation fails or if there is an error creating the user
 */
export const createAccountWithEmailAndPassword = async (
  email,
  password,
  phoneNumber, name
) => {
  try {
    validateSignUp(email, password, phoneNumber, name)
    const userCredential = await createUserWithEmailAndPassword(
      AUTH,
      email,
      password,
    );
    await sendEmailVerification(
      userCredential.user
    )
    const { uid } = userCredential.user;
    return uid;
  } catch (error) {
    if (error.cause) {
      setErrors(error.cause)
    } else {
      Toast.error(error.message)
    }
  }
};


/**
 * Authenticates a user with the provided email and password using Firebase Authentication.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<UserCredential>} A promise that resolves with the user credential if the login is successful.
 * @throws {Error} If the login fails or the email is not verified.
 */
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    validateLogin(email, password)
    const userCredential = await signInWithEmailAndPassword(AUTH, email, password)
    if (!(AUTH.currentUser.emailVerified)) {
      signOut(AUTH)
      throw new Error('Email not verified')
    }
    return userCredential
  } catch (error) {
    if (error.cause) {
      setErrors(error.cause)
    } else {
      Toast.error(error.message)
    }
  }
}

/**
 * Validates the login information provided by the user.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @throws {Error} If the login information is invalid.
 */
const validateLogin = (email, password) => {
  const errors = {}
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  )
  if (!email) {
    errors.email = 'Required'
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address'
  }

  if (!password) {
    errors.password = 'Required'
  }

  if (Object.keys(errors).length) {
    throw new Error("Login failed", { cause: errors });
  }
}

/**
 * Validates the sign-up information provided by the user.
 *
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {string} phoneNumber - The phone number of the user.
 * @param {string} name - The name of the user.
 * @throws {Error} If the sign-up information is invalid.
 */
const validateSignUp = (email, password, phoneNumber, name) => {
  const errors = {}
  const emailRegex = new RegExp(
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  )
  const phoneRegex = new RegExp(
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
  )
  if (!phoneNumber) {
    errors.phoneNumber = 'Required'
  } else if (!phoneRegex.test(phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number'
  }
  if (!name) {
    errors.name = 'Required'
  }
  if (!email) {
    errors.email = 'Required'
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid email address'
  }
  if (!password) {
    errors.password = 'Required'
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }
  if (Object.keys(errors).length) {
    throw new Error("Sign up failed", { cause: errors });
  }
}