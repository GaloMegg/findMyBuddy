import { AntDesign } from '@expo/vector-icons';
import { Button, Modal, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import useGetImagePicker from '../../../utils/images';
import Loader from '../../styledComponents/Loader';
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
const CreateBuddy = ({ loading, closeModal, buddyData, setbuddyData, onCreate, errors }) => {
    const { pickImage } = useGetImagePicker();
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
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    contentContainerStyle={{ gap: 10, alignItems: 'center', justifyContent: 'center' }}
                    style={{ width: '100%', }}>
                    <Text style={{ fontSize: 20 }}>Create a new buddy</Text>
                    <View style={{
                        gap: 10,
                        width: '100%',
                        alignItems: 'center',
                        paddingHorizontal: '10%',
                    }}>
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
                            error={errors.type}
                        />

                        <TextAreaCustom
                            label="Distinctive Markings"
                            onChangeText={(item) => setbuddyData({ ...buddyData, distinctiveMarkings: item })}
                            value={buddyData.distinctiveMarkings}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                        <Button title='Cancel' onPress={closeModal} />
                        <Button title='Create' onPress={onCreate} />
                    </View>
                </ScrollView>

            </SafeAreaView>
        </Modal >
    )
}
export default CreateBuddy
const styles = StyleSheet.create({})