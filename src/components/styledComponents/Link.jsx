import { StyleSheet, Text } from 'react-native';

/**
 * Renders a link component with the provided children and onPress event handler.
 *
 * @param {Object} props - The properties for the Link component.
 * @param {ReactNode} props.children - The content to be rendered inside the link.
 * @param {Function} props.onPress - The event handler for when the link is pressed.
 * @return {JSX.Element} The rendered link component.
 */
const Link = ({ children, onPress }) => {
  return (
    <Text onPress={onPress} style={style.button}>
      {children}
    </Text>
  );
};
export default Link;
const style = StyleSheet.create({
  button: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
