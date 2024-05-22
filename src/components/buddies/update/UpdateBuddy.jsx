import { Modal, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { COLORS } from '../../../utils/constants';
import useGetImagePicker from '../../../utils/images';
import ActionButton from '../../styledComponents/ActionButton';
import CancelButton from '../../styledComponents/CancelButton';
import CloseButton from '../../styledComponents/CloseButton';
import ProfileImageInput from '../../styledComponents/ProfileImageInput';
import SelectInputComponent from '../../styledComponents/SelectInputComponent';
import TextAreaCustom from '../../styledComponents/TextAreaCustom';
import TextInputCustom from '../../styledComponents/TextInputCustom';
import { BUDDIES_TYPE_OPTIONS } from '../helper';

/**
 * Renders a container component for creating buddies.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.closeModal - The function to close the modal.
 * @return {JSX.Element} The rendered container component.
 */
const UpdateBuddy = ({ loading, closeModal, buddyData, setbuddyData, onUpdate, errors }) => {
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
                                setbuddyData({ ...buddyData, image: item })
                            }}
                            value={buddyData.image}
                        />
                        <TextInputCustom
                            label="Name"
                            value={buddyData.name}
                            onChangeText={(item) => setbuddyData({ ...buddyData, name: item })}
                            error={errors.name}

                        />
                        <TextInputCustom
                            label="Age"
                            value={buddyData.age}
                            onChangeText={(item) => setbuddyData({ ...buddyData, age: item })}
                            error={errors.age}
                        />
                        <SelectInputComponent
                            label='Type'
                            options={BUDDIES_TYPE_OPTIONS}
                            onSelect={item => setbuddyData({ ...buddyData, type: item.title.toUpperCase() })}
                            value={buddyData.type}
                            error={errors.type}
                        />

                        <TextAreaCustom
                            label="Distinctive Markings"
                            onChangeText={(item) => setbuddyData({ ...buddyData, distinctiveMarkings: item })}
                            value={buddyData.distinctiveMarkings}
                        />
                    </View>
                    <View style={styles.safeAreaView.scrollView.buttonContainer}>
                        <View style={styles.safeAreaView.scrollView.buttonContainer.button}>
                            <CancelButton text='Cancel' onPress={closeModal} />
                        </View>
                        <View style={styles.safeAreaView.scrollView.buttonContainer.button}>
                            <ActionButton loading={loading}
                                disabled={loading}
                                text='Create' onPress={onUpdate} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal >
    )
}
export default UpdateBuddy

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