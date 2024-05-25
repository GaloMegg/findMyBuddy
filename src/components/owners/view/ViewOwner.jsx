import { Entypo, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AUTH } from '../../../clients/firebase.app';
import EditButton from '../../styledComponents/EditButton';
import SignOutIcon from '../../styledComponents/SignOutIcon';
import UpdateOwnerContainer from '../update/UpdateOwnerContainer';


/**
 * Renders the ViewOwner component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.owner - The owner object containing information about the owner.
 * @param {Function} props.logOut - The function to log out the user.
 * @param {Function} props.findOne - The function to find the owner.
 * @return {JSX.Element} The rendered ViewOwner component.
 */
const ViewOwner = ({ owner, logOut, findOne }) => {
    const [editOwner, setEditOwner] = useState(false)

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaView}>
                <EditButton onPress={() => setEditOwner(true)} />
                <SignOutIcon onPress={logOut} />
            </SafeAreaView>
            {owner.image
                ?
                <Image
                    source={{ uri: owner.image }}
                    style={styles.image}
                    resizeMode='contain'
                />
                :
                <FontAwesome name="user-circle-o" size={100} color="black" />
            }
            <View style={styles.textContainer}>
                <Text style={{ fontSize: 30 }}>{owner.name}</Text>
                {AUTH?.currentUser?.emailVerified ?

                    <MaterialIcons name="verified" size={24} color="black" />
                    :
                    <Octicons name="unverified" size={24} color="black" />
                }
            </View>
            <View style={styles.textContainer}>
                <Entypo name="mail" size={14} color="black" />
                <Text> {owner.email}</Text>
            </View>

            <View style={styles.textContainer}>
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
const styles = StyleSheet.create({
    safeAreaView: {
        flexDirection: 'row', justifyContent: 'flex-end', width: '100%',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
        gap: 10
    },
    container: {
        alignItems: 'center', justifyContent: 'center', gap: 10
    },
    textContainer: { flexDirection: 'row', gap: 10, alignItems: 'center', },
    image: {
        width: 150, height: 150, borderRadius: 300
    }
})
