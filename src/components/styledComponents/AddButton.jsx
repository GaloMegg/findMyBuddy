import { AntDesign } from '@expo/vector-icons';
const AddButton = ({ onPress }) => {
    return (
        <AntDesign name="pluscircle" size={24} color="black" onPress={() => onPress()} />
    )
}
export default AddButton