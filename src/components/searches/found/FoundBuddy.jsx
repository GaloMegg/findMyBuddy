import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../utils/constants';
import ActionButton from '../../styledComponents/ActionButton';
import CancelButton from '../../styledComponents/CancelButton';
import CloseButton from '../../styledComponents/CloseButton';


/**
 * Renders a modal component for confirming the labeling of a buddy as safe.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.loading - Indicates if the component is in a loading state.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {function} props.onLabelAsSafe - The function to handle the labeling of the buddy as safe.
 * @return {JSX.Element} The rendered modal component.
 */
const FoundBuddy = ({ loading, closeModal, onLabelAsSafe }) => {

    return (
        <Modal animationType='slide'
            transparent style={styles.modal}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.safeAreaView.closeModal}>
                    <CloseButton onPress={closeModal} />
                </View>
                <ScrollView contentContainerStyle={styles.safeAreaView.scrollView.container}
                    style={styles.safeAreaView.scrollView.style}>
                    <View style={{ width: '80%' }} >

                        <View style={{
                            alignItems: 'center', justifyContent: 'center'
                            , width: '100%',
                            flexDirection: 'row',
                        }}>

                            <Text>Are you sure you want to label this buddy as </Text><Text style={{ fontWeight: 'bold' }}>
                                SAFE
                            </Text>
                            <Text>?</Text>
                        </View>
                        <Text style={{ width: '100%', textAlign: 'center' }}>This action will delete all the active searches and share your information <Text style={{ fontWeight: 'bold' }}>
                            ( email, phone, and approximate location ) </Text>
                            with the buddy owner
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonContainer.button}>
                            <CancelButton text='No' onPress={closeModal} />
                        </View>
                        <View style={styles.buttonContainer.button}>
                            <ActionButton loading={loading}
                                disabled={loading}
                                text='Yes' onPress={onLabelAsSafe} />
                        </View>
                    </View>

                </ScrollView>

            </SafeAreaView>

        </Modal >
    )
}
export default FoundBuddy
const styles = StyleSheet.create({
    modal: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    safeAreaView: {

        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        closeModal: {
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: '10%'
        },
        scrollView: {
            container: {
                gap: 10, alignItems: 'center', justifyContent: 'center', height: '100%'
            },
            style: { width: '100%', }
        }
    },
    buttonContainer: {
        flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%',
        button: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '35%' }
    },
})