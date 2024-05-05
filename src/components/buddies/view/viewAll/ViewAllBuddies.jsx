import { AntDesign, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Card from '~/components/styledComponents/Card';
import AddButton from '../../../styledComponents/AddButton';
import CreateBuddiesContainer from '../../create/CreateBuddiesContainer';

/**
 * Renders a View displaying all the buddies.
 *
 * @param {Props} buddies - The list of buddies to display
 * @return {JSX.Element} The View displaying all buddies
 */
const ViewAllBuddies = ({ buddies, ownerId, navigation, getAllBuddies, loading }) => {
  const [modal, setModal] = useState(false)

  return (
    <View style={{ width: '100%' }}>
      <View style={{
        flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingHorizontal: 10
      }}>
        <Pressable
          onPress={_ => {
            console.log('TODO Redirect to buddies/{buddyId}/edit')
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red'
            },
            {
              height: '100%',
            }
          ]}
        >
          <Ionicons name="reload-circle" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={_ => {
            console.log('TODO Redirect to buddies/{buddyId}/edit')
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red'
            },
            {
              height: '100%',
            }
          ]}
        >
          <AddButton onPress={() => setModal(true)} />
        </Pressable>
      </View>



      {
        buddies.length ? <FlatList
          refreshing={loading}
          onRefresh={_ => getAllBuddies(ownerId, 'refresh')}
          contentContainerStyle={{ gap: 10, width: '100%', height: '100%' }}
          renderItem={({ item }) => {
            return (
              <Card>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%'
                  }}
                >
                  <View>
                    <Text>asd</Text>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                    <View>
                      <Text>{item.name} </Text>
                      <Text>{item.status}</Text>
                      <Text>{item.breed}</Text>
                      <Text>{item.image}</Text>
                    </View>
                    {/* <BuddyTypeIcon width={30} height={30} buddyType={item.type} /> */}
                  </View>
                  <View
                    style={{
                      width: '25%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <Pressable
                      onPress={_ => {
                        console.log('TODO Redirect to buddies/{buddyId}/edit')
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red'
                        },
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 10,
                          height: '100%',
                          width: '50%'
                        }
                      ]}
                    >
                      {/* <Image
                      tintColor={'white'}
                      resizeMode={'contain'}
                      style={{ width: 20, height: 20 }}
                      source={EDIT}
                    /> */}
                    </Pressable>
                    <Pressable
                      onPress={_ => {
                        console.log('TODO Redirect to buddies/{buddyId}/edit')
                      }}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red'
                        },
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 10,
                          height: '100%',
                          width: '50%'
                        }
                      ]}
                    >
                      {/* <Image
                      tintColor={'white'}
                      resizeMode={'contain'}
                      style={{ width: 20, height: 20 }}
                      source={EDIT}
                    /> */}
                    </Pressable>
                  </View>
                </View>
              </Card>
            )
          }}
          data={buddies}
          keyExtractor={item =>
            item.buddyId + ((Math.random() * 100) / Math.random()).toString()
          }
        /> :
          <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }} >
            <AntDesign name="pluscircle" size={24} color="black" onPress={_ => {
              setModal(true)
            }} />
          </View>
      }

      {modal && <CreateBuddiesContainer closeModal={_ => setModal(false)} />}
    </View>
  )
}

export default ViewAllBuddies

const styles = StyleSheet.create({})
