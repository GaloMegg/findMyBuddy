import { Modal, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../utils/constants';
import useGetImagePicker from '../../../utils/images';
import ActionButton from '../../styledComponents/ActionButton';
import CancelButton from '../../styledComponents/CancelButton';
import CloseButton from '../../styledComponents/CloseButton';
import ProfileImageInput from '../../styledComponents/ProfileImageInput';
import TextInputCustom from '../../styledComponents/TextInputCustom';

/**
 * Renders a container component for updating owner information.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.loading - Indicates if the component is in a loading state.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {Object} props.ownerData - The data of the owner.
 * @param {function} props.setOwnerData - The function to update the owner data.
 * @param {function} props.onUpdate - The function to update the owner.
 * @param {Object} props.errors - The errors object.
 * @return {JSX.Element} The rendered container component.
 */
const UpdateOwner = ({ loading, closeModal, ownerData, setOwnerData, onUpdate, errors }) => {
    const { pickImage } = useGetImagePicker()
    return (
        <Modal animationType='slide'
            transparent style={styles.modal}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.closeContainer}>
                    <CloseButton onPress={closeModal} />
                </View>
                <ScrollView
                    automaticallyAdjustKeyboardInsets
                    contentContainerStyle={styles.safeAreaView.scrollView.contentContainer}
                    style={styles.safeAreaView.scrollView.container}>
                    <View style={styles.safeAreaView.scrollView.formContainer}>
                        <ProfileImageInput
                            onPress={async () => {
                                const item = await pickImage()
                                setOwnerData({ ...ownerData, image: item })
                            }}
                            value={ownerData.image}
                        />
                        <TextInputCustom
                            label="Name"
                            value={ownerData.name}
                            onChangeText={(item) => setOwnerData({ ...ownerData, name: item })}
                            error={errors.name}

                        />
                        <TextInputCustom
                            label="Email"
                            value={ownerData?.email}
                            onChangeText={(item) => setOwnerData({ ...ownerData, email: item })}
                            error={errors.email}

                        />
                        <TextInputCustom
                            label="Phone number"
                            value={ownerData?.phoneNumber}
                            onChangeText={(item) => setOwnerData({ ...ownerData, phoneNumber: item })}
                            error={errors?.phoneNumber}

                        />
                    </View>
                    <View style={styles.safeAreaView.scrollView.buttonContainer}>
                        <View style={styles.safeAreaView.scrollView.buttonContainer.button}>
                            <CancelButton text='Cancel' onPress={closeModal} />
                        </View>
                        <View style={styles.safeAreaView.scrollView.buttonContainer.button}>
                            <ActionButton loading={loading}
                                disabled={loading}
                                text='Update' onPress={onUpdate} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal >
    )
}
export default UpdateOwner

const styles = StyleSheet.create({
    modal: {
        backgroundColor: COLORS.WHITE,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    },
    closeContainer: {
        gap: 10,
        width: '100%',
        alignItems: 'flex-end',
        paddingHorizontal: '10%',
        closeButton: {
        }
    },
    safeAreaView: {
        gap: 10,
        paddingVertical: 15,
        height: '100%',

        backgroundColor: COLORS.WHITE,
        scrollView: {
            text: { fontSize: 20 },
            container: { width: '100%', },
            contentContainer: {
                gap: 10,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '80%'
            },
            buttonContainer: {
                flexDirection: 'row', gap: 10, justifyContent: 'center', width: '100%',
                button: { flexDirection: 'row', gap: 10, justifyContent: 'center', width: '35%' }
            },
            formContainer: {
                gap: 10,
                width: '100%',
                alignItems: 'center',
                paddingHorizontal: '10%',
            },
        }
    }
})