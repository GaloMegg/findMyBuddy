import React from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
// import {ICONS} from '../../../../utils/icons';
// import EDIT from '~/assets/icons/actions/edit.png'
import Card from '~/components/styledComponents/Card'


/**
 * Renders a View displaying all the buddies.
 *
 * @param {Props} buddies - The list of buddies to display
 * @return {JSX.Element} The View displaying all buddies
 */
const ViewAllBuddies = ({ buddies }) => {
  return (
    <View style={{ width: '100%' }}>
      <Text>ViewAllBuddies</Text>
      <FlatList
        contentContainerStyle={{ gap: 10, width: '100%' }}
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
                    <Image
                      tintColor={'white'}
                      resizeMode={'contain'}
                      style={{ width: 20, height: 20 }}
                      source={EDIT}
                    />
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
                    <Image
                      tintColor={'white'}
                      resizeMode={'contain'}
                      style={{ width: 20, height: 20 }}
                      source={EDIT}
                    />
                  </Pressable>
                </View>
              </View>
            </Card>
          )
        }}
        data={[...buddies, ...buddies, ...buddies, ...buddies]}
        keyExtractor={item =>
          item.buddyId + ((Math.random() * 100) / Math.random()).toString()
        }
      />
    </View>
  )
}

export default ViewAllBuddies

const styles = StyleSheet.create({})
