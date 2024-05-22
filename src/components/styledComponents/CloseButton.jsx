import { AntDesign } from '@expo/vector-icons';
const CloseButton = ({ onPress }) => {
    return (
        <AntDesign name="closecircle" size={24} color="black" onPress={() => {

            onPress()
        }} />
    )
}
export default CloseButton