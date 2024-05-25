import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'toastify-react-native';
import { AUTH } from '../clients/firebase.app';
import { deleteSession, getSessions } from '../clients/sqlDataBase';
import { setUser } from '../store/features/userSlice.slice';

/**
 * Custom hook that retrieves the current user's session and provides methods to log out.
 *
 * @return {Object} An object containing the current user's owner ID and a log out method.
 */
const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    const { ownerId: _ownerId } = useSelector(state => state.user)
    const [ownerId, setOwnerId] = useState(AUTH.currentUser?.uid || _ownerId)
    /**
     * Asynchronously signs out the user, deletes the session, resets the user state, and sets the owner ID to null.
     *
     * @return {Promise<void>} A promise that resolves when the user is signed out, the session is deleted, the user state is reset, and the owner ID is set to null.
     */
    const logOut = useCallback(
        async () => {
            try {
                await deleteSession()
                await AUTH.signOut()
                dispatch(setUser({ ownerId: undefined }));
            } catch (error) {
                Toast.error(error.message)
            }
        }, []
    )

    /**
     * Asynchronously retrieves the user session and sets the owner ID based on the response.
     *
     * @return {Promise<void>} A promise that resolves when the owner ID is set.
     */
    const getUserSession = useCallback(async () => {
        const response = await getSessions()
        let ownerId = AUTH.currentUser?.uid || _ownerId
        if (response.rows._array.length) {
            ownerId = (response.rows._array[0].tokenId)
        }
        setOwnerId(ownerId)
    }, [])

    useEffect(() => {
        getUserSession()
    }, [AUTH.currentUser, _ownerId])

    return {
        logOut,
        ownerId,
    };
};

export default useGetCurrentUser;
