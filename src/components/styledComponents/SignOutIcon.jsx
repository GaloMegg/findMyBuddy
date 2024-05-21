import { FontAwesome } from '@expo/vector-icons';
const SignOutIcon = ({ onPress }) => {
    return (
        <FontAwesome name="sign-out" size={30} color="black" onPress={() => onPress()} />
    )
}
export default SignOutIcon