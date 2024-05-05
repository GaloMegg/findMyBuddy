import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
const AddButton = ({onPress}) => {
    return (
        <AntDesign name="pluscircle" size={24} color="black" onPress={() => onPress()} />
    )
}
export default AddButton
const styles = StyleSheet.create({})