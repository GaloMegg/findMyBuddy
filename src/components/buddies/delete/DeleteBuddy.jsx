import { AntDesign } from '@expo/vector-icons';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../../styledComponents/Loader';
import { ICONS_MAPPED } from './helper';
/**
 * Renders a container component for creating buddies.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.closeModal - The function to close the modal.
 * @return {JSX.Element} The rendered container component.
 */
const DeleteBuddy = ({ loading, closeModal, buddyData, onDelete }) => {
    if (loading) return <Modal>
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Loader />
        </SafeAreaView>
    </Modal>
    return (
        <Modal style={{}}>
            <SafeAreaView style={{}}>
                <AntDesign name="closecircle" size={24} color="black" style={{ gap: 10, width: '100%', alignItems: 'flex-start', paddingHorizontal: '10%' }} onPress={closeModal} />
            </SafeAreaView>
            <SafeAreaView style={{
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: '80%'
            }}>
                <ScrollView contentContainerStyle={{ gap: 10, alignItems: 'center', justifyContent: 'center', height: '100%' }}
                    style={{ width: '100%', }}>

                    <Text style={{ fontSize: 20 }}>Delete a buddy</Text>
                    <View>
                        <Text>Are you sure you want to delete {buddyData.name}?</Text>
                        <View style={{ gap: 10, flexDirection: 'row', padding: 10, justifyContent: 'center' }}>
                            <View style={{ gap: 10, flexDirection: 'row', padding: 10, justifyContent: 'center' }}>

                                <Text>Type:</Text>
                                <Icon name={ICONS_MAPPED[buddyData.type]} />
                            </View>
                            <View style={{ gap: 10, flexDirection: 'row', padding: 10, justifyContent: 'center' }}>

                                <Text>Status:</Text>
                                <Icon name={ICONS_MAPPED[buddyData.status]} />
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                        <Button title='Cancel' onPress={closeModal} />
                        <Button title='Delete' onPress={onDelete} />
                    </View>
                </ScrollView>

            </SafeAreaView>
        </Modal >
    )
}
export default DeleteBuddy
const styles = StyleSheet.create({})