import { SafeAreaView, StyleSheet } from 'react-native'
import useGetCurrentUser from '../../../hooks/useGetCurrentUser'
import useOwners from '../../../hooks/useOwner'
import Loader from '../../styledComponents/Loader'
import ViewOwner from './ViewOwner'
const ViewOwnerContainer = ({ navigation }) => {
    const { ownerId, logOut } = useGetCurrentUser()
    const { loading, findOne, owner } = useOwners({ ownerId })
    if (loading) return <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Loader />
    </SafeAreaView>

    return ( 
        <SafeAreaView>
            <ViewOwner
                owner={owner}
                logOut={() => {
                    logOut()
                }}
                findOne={findOne}
            />
        </SafeAreaView>
    )
}
export default ViewOwnerContainer
const styles = StyleSheet.create({})