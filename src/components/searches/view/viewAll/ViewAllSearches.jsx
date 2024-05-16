import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import Card from '~/components/styledComponents/Card';
/**
 * Renders a View displaying all the searches.
 *
 * @param {Props} searches - The list of searches to display
 * @return {JSX.Element} The View displaying all searches
 */
const ViewAllSearches = ({ searches, ownerId, getAllSearches, loading }) => {

  return (
    <View style={{ width: '100%' }}>
      {
        <FlatList
          refreshing={loading}
          onRefresh={_ => {
            Vibration.vibrate(1);
            getAllSearches(ownerId)
          }}
          contentContainerStyle={{ gap: 10, width: '100%', height: '100%', paddingHorizontal: 10, }}
          numColumns={2}
          columnWrapperStyle={{ gap: 10, justifyContent: 'space-around', flexDirection: 'row', width: '100%', }}

          renderItem={({ item }) => {
            console.log(item)
            return (

              <Card>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '60%',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: '100%'
                  }}
                >
                  <View>
                    <Text>Name: {item.name}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Type: {item.type}</Text>
                  </View>

                </View>
              </Card>


            )
          }}
          data={searches}
          keyExtractor={
            item =>
              item.buddyId
          }
        />

      }

    </View >
  )
}

export default ViewAllSearches

const styles = StyleSheet.create({
  noItemsAddButton: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }
})

