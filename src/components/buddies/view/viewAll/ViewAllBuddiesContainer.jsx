import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import useGetBuddies from '~/hooks/useGetBuddies'
import Loader from '../../../styledComponents/Loader'
import ViewAllBuddies from './ViewAllBuddies'

/**
 * Renders the ViewAllBuddiesContainer component.
 *
 * @param {object} props - The props object.
 * @return {JSX.Element} The rendered ViewAllBuddiesContainer component.
 */
const ViewAllBuddiesContainer = ({ navigation }) => {
  const { ownerId } = useSelector(state => state.user)

  const { buddies, deleteBuddy, getAllBuddies, loading } = useGetBuddies({
    ownerId,
  })
  console.log('buddies', buddies)
  if (loading)
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </SafeAreaView>
    )
  return <SafeAreaView >
    <ViewAllBuddies
      loading={loading}
      ownerId={ownerId}
      getAllBuddies={getAllBuddies}
      buddies={buddies}
      navigation={navigation} />
  </SafeAreaView>
}

export default ViewAllBuddiesContainer

const styles = StyleSheet.create({})
