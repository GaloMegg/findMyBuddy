import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useGetCurrentUser from '../../../../hooks/useGetCurrentUser'
import useSearches from '../../../../hooks/useSearches'
import ViewAllSearches from './ViewAllSearches'

/**
 * Renders the ViewAllSearchesContainer component.
 *
 * @param {object} props - The props object.
 * @return {JSX.Element} The rendered ViewAllSearchesContainer component.
 */
const ViewAllSearchesContainer = ({ navigation }) => {
  const { ownerId } = useGetCurrentUser()
  const { getAllSearches, loading, searches } = useSearches()

  return <SafeAreaView>
    <ViewAllSearches
      loading={loading}
      ownerId={ownerId}
      getAllSearches={getAllSearches}
      searches={searches}
    />
  </SafeAreaView>
}

export default ViewAllSearchesContainer

const styles = StyleSheet.create({})
