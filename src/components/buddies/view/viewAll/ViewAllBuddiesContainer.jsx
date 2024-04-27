import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import useGetBuddies from '~/hooks/useGetBuddies'
import ViewAllBuddies from './ViewAllBuddies'

/**
 * Renders the ViewAllBuddiesContainer component.
 *
 * @param {object} props - The props object.
 * @return {JSX.Element} The rendered ViewAllBuddiesContainer component.
 */
const ViewAllBuddiesContainer = ({ }) => {
  const { userId } = useSelector(state => state.user)

  const { buddies, deleteBuddy, loading } = useGetBuddies({
    ownerId: userId,
  })
  if (loading)
    return (
      <SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>
    )
  return <SafeAreaView>
    <ViewAllBuddies buddies={buddies} />
  </SafeAreaView>
}

export default ViewAllBuddiesContainer

const styles = StyleSheet.create({})
