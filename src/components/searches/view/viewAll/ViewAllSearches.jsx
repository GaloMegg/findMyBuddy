import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '~/components/styledComponents/Card';
import { COLORS } from '../../../../utils/constants';
import SwipeTickIcon from '../../../styledComponents/swipables/SwipeTickIcon';
import FoundBuddiesContainer from '../../found/FoundBuddiesContainer';
/**
 * Renders a View displaying all the searches.
 *
 * @param {Props} searches - The list of searches to display
 * @return {JSX.Element} The View displaying all searches
 */
const ViewAllBuddies = ({ searches, ownerId, getAllSearches }) => {
  const [loading, setLoading] = useState(false)
  const [foundModal, setFoundModal] = useState(false)
  const [buddyData, setBuddyData] = useState({})
  const RenderLeftFoundActions = (buddyData) => {
    return (
      <View

        style={{
          width: '37.5%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >

        <SwipeTickIcon onPress={_ => {
          setBuddyData(buddyData)
          setFoundModal(true)
        }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ height: '100%' }}>
    
      <FlatList
        ListEmptyComponent={<View style={styles.noItemsAddButton} >
          <Text style={{ color: COLORS.primary, fontSize: 20 }}>Amazing news, no buddies lost nearby</Text>
          <Text style={{ color: COLORS.primary, fontSize: 20 }}>Try moving around, like Pokémon but IRL</Text>
        </View>}
        refreshing={loading}
        numColumns={2}
        onRefresh={async _ => {
          setLoading(true)
          Vibration.vibrate(1);
          await getAllSearches(ownerId)
          setLoading(false)
        }}
        contentContainerStyle={{
          gap: 15,
          minHeight: '100%',
          paddingHorizontal: '10%',
          marginBottom: '30%',
          width: '100%',
        }}

        columnWrapperStyle={{
          gap: 15,
          justifyContent: 'flex-start',
          flexDirection: 'row',
          width: '100%',
        }}

        renderItem={({ item }) => {
          return (
            <Swipeable
              renderLeftActions={() => RenderLeftFoundActions(item)}
            >
              <Card>
                <View
                  style={{
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: '100%'
                  }}
                >
                  <View style={{
                    width: '100%', height: '50%',
                    position: 'relative',
                  }}>

                    <Image source={{ uri: item.image }} style={{
                      width: '100%',
                      height: '100%',
                      borderTopLeftRadius: 15, borderTopRightRadius: 15,
                      position: 'absolute'
                    }} />
                  </View>

                  <View style={{ padding: 10, width: '100%' }}>

                    <View style={{
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center'
                    }}>

                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                      {item.type && <Icon name={item.type.toLowerCase()} size={24} color="black" />}
                    </View>
                    <View style={{ gap: 5 }}>
                      <Text>{item.age}</Text>
                      <Text>{item.distinctiveMarkings}</Text>
                    </View>
                  </View>

                </View>
              </Card>
            </Swipeable >

          )
        }}
        data={searches}
        keyExtractor={
          item =>
            item.buddyId
        }
      />

      {foundModal && <FoundBuddiesContainer
        buddyData={buddyData}
        closeModal={(refresh) => { setFoundModal(false); refresh && getAllSearches(ownerId) }} />}
    </SafeAreaView >
  )
}

export default ViewAllBuddies

const styles = StyleSheet.create({
  noItemsAddButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})

