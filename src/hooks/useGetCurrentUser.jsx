import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AUTH } from '../clients/firebase.app';
import { getSessions } from '../clients/sqlDataBase';


const useGetCurrentUser = () => {
    const { ownerId: _ownerId } = useSelector(state => state.user)
    const [ownerId, setOwnerId] = useState(AUTH.currentUser?.uid || _ownerId)

    useEffect(() => {
        (async () => {
            try {
                const response = await getSessions()
                if (response.rows._array.length) {
                    setOwnerId(response.rows._array[0].tokenId)
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    useEffect(() => {
        setOwnerId(AUTH.currentUser?.uid)
        return () => {
        }
    }, [AUTH, _ownerId])
    return {
        ownerId
    };
};

export default useGetCurrentUser;
