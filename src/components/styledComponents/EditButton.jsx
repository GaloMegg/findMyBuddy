import { FontAwesome5 } from '@expo/vector-icons';
/**
 * Renders an EditButton component.
 *
 * @param {Object} props - The properties for the EditButton component.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @return {JSX.Element} The rendered EditButton component.
 */
const EditButton = ({ onPress }) => {
    return (
        <FontAwesome5 name="user-edit" size={24} color="black" onPress={() => onPress()} />
    )
}
export default EditButton