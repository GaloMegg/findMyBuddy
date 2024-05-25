import { FontAwesome } from '@expo/vector-icons';
/**
 * Renders a sign-out icon component.
 *
 * @param {Object} props - The properties for the sign-out icon component.
 * @param {function} props.onPress - The function to call when the icon is pressed.
 * @return {JSX.Element} The rendered sign-out icon component.
 */
const SignOutIcon = ({ onPress }) => {
    return (
        <FontAwesome name="sign-out" size={30} color="black" onPress={() => onPress()} />
    )
}
export default SignOutIcon