import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH } from '../clients/firebase.app';
import { deleteSession, getSessions } from '../clients/sqlDataBase';


const useGetCurrentUser = () => {
    const { ownerId: _ownerId } = useSelector(state => state.user)
    const [ownerId, setOwnerId] = useState(AUTH.currentUser?.uid || _ownerId)
    const dispatch = useDispatch()
    const logOut = async () => {
        await AUTH.signOut()
        await deleteSession()
        dispatch(resetUser())
        setOwnerId(null)
    }

    useEffect(() => {
        (async () => {
            const response = await getSessions()
            if (response.rows._array.length) {
                setOwnerId(response.rows._array[0].tokenId)
            }

        })()
    }, [])

    useEffect(() => {
        setOwnerId(AUTH.currentUser?.uid)
        return () => {
        }
    }, [AUTH, _ownerId])
    return {
        ownerId,
        logOut
    };
};

export default useGetCurrentUser;
