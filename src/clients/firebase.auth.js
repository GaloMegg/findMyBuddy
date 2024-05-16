import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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
) => {
  const userCredential = await createUserWithEmailAndPassword(
    AUTH,
    email,
    password,
  );
  sendEmailVerification(AUTH.currentUser)
  const { uid } = userCredential.user;
  return uid;
};


export const loginWithEmailAndPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(AUTH, email, password)
  if (!(AUTH.currentUser.emailVerified)) {
    signOut(AUTH)
    throw new Error('Email not verified')

  }
  return userCredential
}
