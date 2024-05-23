import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../clients/firebase.app';
import { deleteSession, getSessions } from '../clients/sqlDataBase';

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
            await AUTH.signOut()
            await deleteSession()
            dispatch(resetUser())
            setOwnerId(null)
        }
    )

    /**
     * Asynchronously retrieves the user session and sets the owner ID based on the response.
     *
     * @return {Promise<void>} A promise that resolves when the owner ID is set.
     */
    const getUserSession = useCallback(async () => {
        const response = await getSessions()
        if (response.rows._array.length) {
            setOwnerId(response.rows._array[0].tokenId)
        } else (
            setOwnerId(AUTH.currentUser?.uid)
        )
    }, [])

    useEffect(() => {
        getUserSession()
    }, [])

    return {
        logOut,
        ownerId,
    };
};

export default useGetCurrentUser;
