import { AntDesign } from '@expo/vector-icons';
/**
 * Renders a CloseButton component.
 *
 * @param {Object} props - The properties for the CloseButton component.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @return {JSX.Element} The rendered CloseButton component.
 */
const CloseButton = ({ onPress }) => {
    return (
        <AntDesign name="closecircle" size={24} color="black" onPress={() => {

            onPress()
        }} />
    )
}
export default CloseButton