import { SafeAreaView, StyleSheet } from 'react-native'
import { AUTH } from '../../../clients/firebase.app'
import useOwners from '../../../hooks/useOwner'
import Loader from '../../styledComponents/Loader'
import ViewOwner from './ViewOwner'
const ViewOwnerContainer = () => {

    const { loading, findOne, owner } = useOwners({ ownerId: AUTH.currentUser.uid })

    console.log(owner)
  
    if (loading) return <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
    </SafeAreaView>

    return (
        <SafeAreaView>
            <ViewOwner owner={owner} />
        </SafeAreaView>
    )
}
export default ViewOwnerContainer
const styles = StyleSheet.create({})