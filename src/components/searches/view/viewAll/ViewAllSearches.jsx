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
import LocationService from '../../../../services/location.service';
import { COLORS } from '../../../../utils/constants';
import SwipeTickIcon from '../../../styledComponents/swipables/SwipeTickIcon';
import FoundBuddiesContainer from '../../found/FoundBuddiesContainer';

/**
 * Renders a view displaying all the buddies.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.searches - The list of searches to display.
 * @param {string} props.ownerId - The ID of the owner.
 * @param {Function} props.getAllSearches - The function to get all searches.
 * @return {JSX.Element} The view displaying all buddies.
 */
const ViewAllBuddies = ({ searches, ownerId, getAllSearches }) => {
  const [loading, setLoading] = useState(false)
  const [foundModal, setFoundModal] = useState(false)
  const [buddyData, setBuddyData] = useState({})
  const RenderLeftFoundActions = (buddyData) => {
    return (
      <View
        style={styles.swipe}
      >
        <SwipeTickIcon onPress={_ => {
          setBuddyData(buddyData)
          setFoundModal(true)
        }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
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
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        renderItem={async ({ item }) => {
          const location = await LocationService.getInstance().getFormattedLocation({ latitude: item?.latitude, longitude: item?.longitude })
          return (
            <Swipeable
              renderLeftActions={() => RenderLeftFoundActions(item)}
            >
              <Card>
                <View
                  style={styles.cardViewContainer}
                >
                  <View style={styles.image.container}>

                    <Image source={{ uri: item.image }} style={
                      styles.image
                    } />
                  </View>

                  <View style={styles.info.container}>
                    <View style={styles.info.name.container}>
                      <Text style={styles.info.name.text}>{item.name}</Text>
                      {item.type && <Icon name={item.type.toLowerCase()} size={24} color="black" />}
                    </View>
                    <View style={styles.info.description}>
                      <Text>{item.distinctiveMarkings}</Text>
                      <Text numberOfLines={2}>{location}</Text>
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
  safeAreaView: {
    height: '100%'
  },
  swipe: {
    width: '37.5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  columnWrapperStyle: {
    gap: 15,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
  },
  contentContainerStyle: {
    gap: 15,
    minHeight: '100%',
    paddingHorizontal: '10%',
    marginBottom: '30%',
    width: '100%',
  },
  noItemsAddButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  cardViewContainer: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%'
  },
  image: {
    container: {
      width: '100%', height: '50%',
      position: 'relative',
    },
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 15, borderTopRightRadius: 15,
    position: 'absolute'
  }
  , info: {
    container: { padding: 10, width: '100%' },
    name: {
      container: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center'
      },
      text: { fontWeight: 'bold', fontSize: 18 }
    },
    description: {
      gap: 5
    }

  }
})

