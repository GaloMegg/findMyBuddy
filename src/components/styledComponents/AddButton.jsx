import { AntDesign } from '@expo/vector-icons';
/**
 * Renders an AddButton component.
 *
 * @param {Object} props - The properties for the AddButton component.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @return {JSX.Element} The rendered AddButton component.
 */
const AddButton = ({ onPress }) => {
    return (
        <AntDesign name="pluscircle" size={24} color="black" onPress={() => onPress()} />
    )
}
export default AddButton