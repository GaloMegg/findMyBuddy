import React from 'react';
import { StyleSheet, TextInput } from 'react-native';


/**
 * Renders a custom text input component.
 *
 * @param {object} props - The props object containing the following properties:
 * @param  {string} placeholder: The placeholder text for the input.
 * @param {function} onChangeText: The callback function to handle text changes.
 * @param  {boolean} secureTextEntry: (optional) Whether to mask the input text.
 * @param  {string} value: (optional) The initial value of the input.
 * @return {JSX.Element} The rendered custom text input component.
 */
const TextInputCustom = ({
  placeholder,
  onChangeText,
  secureTextEntry = false,
  value,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      value={value}
    />
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    borderRadius: 8,
    padding: 8,
    height: 40,
  },
});
