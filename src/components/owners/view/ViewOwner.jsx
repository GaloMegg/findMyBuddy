import { Entypo, FontAwesome, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AUTH } from '../../../clients/firebase.app';
// {"email": "Galomeggiolarobul@gmail.com", "location": {"latitude": 0, "longitude": 0}, "name": "Gaño prueba", "ownerId": "55TmD9uRKQWzwtOq1aJr2i9TW8O2", "phoneNumber": "", profilePicture:''}
const ViewOwner = ({ owner }) => {
    console.log(AUTH.currentUser)
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {owner.profilePicture
                ?
                <Image
                    source={{ uri: owner.profilePicture }}
                    style={{ width: 150, height: 150, borderRadius: 300 }}
                    resizeMode='contain'

                />
                :
                <FontAwesome name="user-circle-o" size={100} color="black" />
            }
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', }}>

                <Text style={{ fontSize: 30 }}>{owner.name}</Text>
                {AUTH.currentUser.emailVerified ?

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

        </View>
    )
}

export default ViewOwner
const styles = StyleSheet.create({})

// city: The name of the city.
//     country: The name of the country.
//         district: The name of the district.
//             isoCountryCode: The ISO country code.
//                 name: The name of the location.
//                     postalCode: The postal code.
//                         region: The name of the region.
//                             street: The name of the street.
//                                 streetNumber: The street number.
//                                     subregion: The name of the subregion(null if not available).
// timezone: The timezone of the location