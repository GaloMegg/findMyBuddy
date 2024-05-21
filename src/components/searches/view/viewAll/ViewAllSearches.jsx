import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

                    <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                      <Text>Status:</Text>
                      <Icon name={item.status.toLowerCase() == 'LOST' ? 'alert' : 'home'} size={24} color="#000" />
                    </View>

                    <View style={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
                      <Text>Type:</Text>
                      <Icon name={item.type.toLowerCase()} size={24} color="#000" />
                    </View>
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

})

