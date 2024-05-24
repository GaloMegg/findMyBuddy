import { Entypo, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AUTH } from '../../../clients/firebase.app';
import EditButton from '../../styledComponents/EditButton';
import SignOutIcon from '../../styledComponents/SignOutIcon';
import UpdateOwnerContainer from '../update/UpdateOwnerContainer';
// {"email": "Galomeggiolarobul@gmail.com", "location": {"latitude": 0, "longitude": 0}, "name": "Gaño prueba", "ownerId": "55TmD9uRKQWzwtOq1aJr2i9TW8O2", "phoneNumber": "", profilePicture:''}
const ViewOwner = ({ owner, logOut, findOne }) => {
    const [editOwner, setEditOwner] = useState(false)

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>

            <SafeAreaView style={{
                flexDirection: 'row', justifyContent: 'flex-end', width: '100%',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginBottom: 10,
                gap: 10
            }}>
                <EditButton onPress={() => setEditOwner(true)} />
                <SignOutIcon onPress={logOut} />
            </SafeAreaView>
            {owner.image
                ?
                <Image
                    source={{ uri: owner.image }}
                    style={{ width: 150, height: 150, borderRadius: 300 }}
                    resizeMode='contain'
                />
                :
                <FontAwesome name="user-circle-o" size={100} color="black" />
            }
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>

                <Text style={{ fontSize: 30 }}>{owner.name}</Text>
                {AUTH?.currentUser?.emailVerified ?

                    <MaterialIcons name="verified" size={24} color="black" />
                    :
                    <Octicons name="unverified" size={24} color="black" />
                }


            </View>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                <Entypo name="mail" size={14} color="black" />
                <Text> {owner.email}</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>
                <Entypo name="phone" size={14} color="black" />
                <Text>{owner.phoneNumber || '-'}</Text>
            </View>
            {editOwner && <UpdateOwnerContainer
                closeModal={async (refresh) => {
                    setEditOwner(false);
                    if (refresh) {
                        await findOne(owner.ownerId)
                    }
                }}
                ownerInitialData={owner} />}
        </View>
    )
}

export default ViewOwner
const styles = StyleSheet.create({})
