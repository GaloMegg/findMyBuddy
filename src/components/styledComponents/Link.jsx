import { StyleSheet, Text } from 'react-native';

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
