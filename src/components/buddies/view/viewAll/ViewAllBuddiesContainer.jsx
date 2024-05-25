import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loader from '../../../styledComponents/Loader'
import ViewAllBuddies from './ViewAllBuddies'


/**
 * Renders the ViewAllBuddiesContainer component.
 *
 * @param {object} props - The props object.
 * @param {object} props.navigation - The navigation object.
 * @return {JSX.Element} The rendered ViewAllBuddiesContainer component.
 */
const ViewAllBuddiesContainer = ({ navigation }) => {
  const { ownerId } = useGetCurrentUser()
  const { buddies, getAllBuddies, loading,  } = useBuddies({ ownerId, })
  if (loading)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </SafeAreaView>
    )
  return <SafeAreaView >
    <ViewAllBuddies
      ownerId={ownerId}
      getAllBuddies={getAllBuddies}
      buddies={buddies}
      navigation={navigation} />
  </SafeAreaView>
}

export default ViewAllBuddiesContainer

const styles = StyleSheet.create({})
