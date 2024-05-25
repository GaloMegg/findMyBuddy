import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../utils/constants';
import ActionButton from '../../styledComponents/ActionButton';
import CancelButton from '../../styledComponents/CancelButton';
import CloseButton from '../../styledComponents/CloseButton';

/**
 * Renders a container component for deleting a buddy.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.loading - Indicates if the delete operation is loading.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {Object} props.buddyData - The data of the buddy to be deleted.
 * @param {function} props.onDelete - The function to handle the delete operation.
 * @return {JSX.Element} The rendered container component.
 */
const DeleteBuddy = ({ loading, closeModal, buddyData, onDelete }) => {

    return (
        <Modal animationType='slide'
            transparent style={styles.modal}>

            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.safeAreaView.closeModal}>
                    <CloseButton onPress={closeModal} />
                </View>

                <ScrollView contentContainerStyle={styles.safeAreaView.contentContainerStyle}
                    style={styles.safeAreaView.scrollView}>


                    <Text style={styles.text}>
                        Are you sure you want to delete
                        <Text style={styles.bold}> {buddyData.name}
                        </Text>
                        ?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainer.button}>
                            <CancelButton text='Cancel' onPress={closeModal} />
                        </View>
                        <View style={styles.buttonContainer.button}>
                            <ActionButton loading={loading}
                                disabled={loading}
                                text='Delete' onPress={onDelete} />
                        </View>
                    </View>

                </ScrollView>

            </SafeAreaView>
        </Modal >
    )
}
export default DeleteBuddy
const styles = StyleSheet.create({
    safeAreaView: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        backgroundColor: COLORS.WHITE,
        closeModal: { flexDirection: 'row', gap: 10, justifyContent: 'flex-end', width: '100%', paddingHorizontal: '10%' },
        contentContainerStyle: { gap: 20, alignItems: 'center', justifyContent: 'center', height: '100%' },
        scrollView: {
            width: '100%',
        }
    },
    modal: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%',
        button: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '35%' }
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        fontSize: 20
    }
})