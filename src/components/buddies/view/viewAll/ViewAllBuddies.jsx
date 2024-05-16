import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Card from '~/components/styledComponents/Card';
import AddButton from '../../../styledComponents/AddButton';
import SwipePencilIcon from '../../../styledComponents/swipables/SwipePencilIcon';
import SwipeTrashIcon from '../../../styledComponents/swipables/SwipeTrashIcon';
import SwipeWarningIcon from '../../../styledComponents/swipables/SwipeWarningIcon';
import CreateBuddiesContainer from '../../create/CreateBuddiesContainer';
import DeleteBuddiesContainer from '../../delete/DeleteBuddiesContainer';
import LostModalContainer from '../../lost/LostBuddiesContainer';
import UpdateBuddiesContainer from '../../update/UpdateBuddiesContainer';
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
    <View style={{ width: '100%' }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'flex-end', width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10
      }}>
        <AddButton onPress={() => setCreateModal(true)} />
      </View>



      {buddies.length ?
        <FlatList
          refreshing={loading}
          onRefresh={_ => {
            Vibration.vibrate(1);
            getAllBuddies(ownerId)
          }}
          contentContainerStyle={{ gap: 10, width: '100%', height: '100%', paddingHorizontal: 10, }}
          numColumns={2}
          columnWrapperStyle={{ gap: 10, justifyContent: 'space-around', flexDirection: 'row', width: '100%', }}

          renderItem={({ item }) => {
            console.log(item)
            return (
              <Swipeable renderRightActions={() => RenderRightActions(item)
              }
                renderLeftActions={() => RenderLeftActions(item)}
              >
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
          <AntDesign name="pluscircle" size={24} color="black" onPress={_ => {
            setCreateModal(true)
          }} />
        </View>}

      {createModal && <CreateBuddiesContainer closeModal={_ => { setCreateModal(false); getAllBuddies(ownerId) }} />}

      {deleteModal && <DeleteBuddiesContainer buddyData={buddyData} closeModal={_ => { setDeleteModal(false); getAllBuddies(ownerId) }} />}

      {editModal && <UpdateBuddiesContainer buddyDataInitialValue={buddyData} closeModal={_ => { setDeleteModal(false); getAllBuddies(ownerId) }} />}

      {lostModal && <LostModalContainer buddyData={buddyData} closeModal={_ => { setLostModal(false); getAllBuddies(ownerId) }} />}
    </View >
  )
}

export default ViewAllBuddies

const styles = StyleSheet.create({
  noItemsAddButton: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }
})

