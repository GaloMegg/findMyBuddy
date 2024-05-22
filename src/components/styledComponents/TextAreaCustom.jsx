import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS } from '../../utils/constants';


/**
 * Renders a custom text input component.
 *
 * @param {object} props - The props object containing the following properties:
 * @param  {string} label: The label text for the input.
 * @param {function} onChangeText: The callback function to handle text changes.
 * @param  {boolean} secureTextEntry: (optional) Whether to mask the input text.
 * @param  {string} value: (optional) The initial value of the input.
 * @return {JSX.Element} The rendered custom text input component.
 */
const TextAreaCustom = ({
  label,
  onChangeText,
  secureTextEntry = false,
  value,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
      />
    </View>
  );
};

export default TextAreaCustom;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.DARK_BROWN,
    width: '100%',
    borderRadius: 8,
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    height: 80,
  },
});
