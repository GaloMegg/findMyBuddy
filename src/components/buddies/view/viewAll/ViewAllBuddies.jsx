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
import AddButton from '../../../styledComponents/AddButton';
import SwipePencilIcon from '../../../styledComponents/swipables/SwipePencilIcon';
import SwipeTrashIcon from '../../../styledComponents/swipables/SwipeTrashIcon';
import SwipeWarningIcon from '../../../styledComponents/swipables/SwipeWarningIcon';
import CreateBuddiesContainer from '../../create/CreateBuddiesContainer';
import DeleteBuddiesContainer from '../../delete/DeleteBuddiesContainer';
import LostModalContainer from '../../lost/LostBuddiesContainer';
import UpdateBuddiesContainer from '../../update/UpdateBuddiesContainer';

import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../../../utils/constants';
/**
 * Renders a View displaying all the buddies.
 *
 * @param {Props} buddies - The list of buddies to display
 * @return {JSX.Element} The View displaying all buddies
 */
const ViewAllBuddies = ({ buddies, ownerId, navigation, getAllBuddies, loading }) => {
  const [createModal, setCreateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [buddyData, setBuddyData] = useState({})
  const [lostModal, setLostModal] = useState(false)
  const RenderRightActions = (buddyData) => {

    return (
      <View
        style={{
          width: '75%',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <SwipeTrashIcon onPress={_ => {
          setBuddyData(buddyData)
          setDeleteModal(true)
        }} />
        <SwipePencilIcon onPress={_ => {
          setBuddyData(buddyData)
          setEditModal(true)
        }} />
      </View>
    );
  };
  const RenderLeftActions = (buddyData) => {
    return (
      <View
        style={{
          width: '37.5%',
          flexDirection: 'row',
          justifyContent: 'center',
          height: '100%',
        }}
      >

        <SwipeWarningIcon onPress={_ => {
          setBuddyData(buddyData)
          setLostModal(true)
        }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'flex-end', width: '100%',
        paddingHorizontal: '10%',
        marginBottom: 10
      }}>
        <AddButton onPress={() => setCreateModal(true)} />
      </View>



      {buddies.length
        ?
        <FlatList
          refreshing={loading}
          numColumns={2}
          onRefresh={_ => {
            Vibration.vibrate(1);
            getAllBuddies(ownerId)
          }}
          contentContainerStyle={{
            gap: 15,
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
                renderRightActions={() => RenderRightActions(item)}
                renderLeftActions={() => RenderLeftActions(item)}
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
                      {item.status == 'LOST' &&
                        <View style={{
                          width: 37,
                          height: 37,
                          justifyContent: 'center', alignItems: 'center',
                          position: 'absolute',
                          right: 4,
                          top: 4,
                          zIndex: 1,
                          borderRadius: '100%',
                          backgroundColor: '#f4d03f',
                        }}>

                          <FontAwesome name="warning" size={24} color={COLORS.WHITE} style={{}} />
                        </View>
                      }
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
          data={buddies}
          keyExtractor={
            item =>
              item.buddyId
          }
        />
        :
        <View style={styles.noItemsAddButton} >
          <AddButton onPress={_ => {
            setCreateModal(true)
          }} />
        </View>}

      {createModal && <CreateBuddiesContainer closeModal={_ => { setCreateModal(false); getAllBuddies(ownerId) }} />}
      {deleteModal && <DeleteBuddiesContainer buddyData={buddyData} closeModal={_ => { setDeleteModal(false); getAllBuddies(ownerId) }} />}
      {editModal && <UpdateBuddiesContainer buddyDataInitialValue={buddyData} closeModal={_ => { setDeleteModal(false); getAllBuddies(ownerId) }} />}
      {lostModal && <LostModalContainer buddyData={buddyData} closeModal={_ => { setLostModal(false); getAllBuddies(ownerId) }} />}
    </SafeAreaView >
  )
}

export default ViewAllBuddies

const styles = StyleSheet.create({
  noItemsAddButton: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  }
})

