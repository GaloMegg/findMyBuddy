import useGetBuddies from 'hooks/useGetBuddies'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import ViewAllBuddies from './ViewAllBuddies'

/**
 * Renders the ViewAllBuddiesContainer component.
 *
 * @param {object} props - The props object.
 * @return {JSX.Element} The rendered ViewAllBuddiesContainer component.
 */
const ViewAllBuddiesContainer = ({ }) => {
  const { buddies, deleteBuddy, loading } = useGetBuddies({
    ownerId: 'r85AaNEsNBe5xkMs67E1eaxQYGg1',
  })
  if (loading)
    return (
      <Text>Loading</Text>
    )
  return <ViewAllBuddies buddies={buddies} />
}

export default ViewAllBuddiesContainer

const styles = StyleSheet.create({})