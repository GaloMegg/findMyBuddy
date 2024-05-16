import { AntDesign } from '@expo/vector-icons';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Loader from '../../styledComponents/Loader';

/**
 * Renders a container component for creating buddies.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.closeModal - The function to close the modal.
 * @return {JSX.Element} The rendered container component.
 */
const LostBuddy = ({ loading, closeModal, onCreate }) => {
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
                    <Text>Are you sure you want to label this buddy as lost?</Text>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                        <Button title='No' onPress={closeModal} />
                        <Button title='Yes' onPress={onCreate} />
                    </View>
                </ScrollView>

            </SafeAreaView>

        </Modal >
    )
}
export default LostBuddy
const styles = StyleSheet.create({})