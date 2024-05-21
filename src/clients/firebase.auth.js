import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Toast } from 'toastify-react-native';
import { AUTH } from './firebase.app';

/**
 * Creates an account with the given email and password.
 *
 * @param {string} email - the email for the account
 * @param {string} password - the password for the account
 * @return {Promise<string>} a promise that resolves with the user credential
 */
export const createAccountWithEmailAndPassword = async (
  email,
  password,
  phoneNumber, name
) => {
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
};


export const loginWithEmailAndPassword = async (email, password) => {
  validateLogin(email, password)
  const userCredential = await signInWithEmailAndPassword(AUTH, email, password)
  if (!(AUTH.currentUser.emailVerified)) {
    signOut(AUTH)
    Toast.error('Email not verified')
    throw new Error('Email not verified')
  }
  return userCredential
}

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

  if (Object.keys(errors).length) { throw errors }
}

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
  if (Object.keys(errors).length) { throw errors }
}