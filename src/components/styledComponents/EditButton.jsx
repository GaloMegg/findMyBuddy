import { FontAwesome5 } from '@expo/vector-icons';
const EditButton = ({ onPress }) => {
    return (
        <FontAwesome5 name="user-edit" size={24} color="black" onPress={() => onPress()} />
    )
}
export default EditButton