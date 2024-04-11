import React from 'react'
import { StyleSheet, View } from 'react-native'

/**
 * A function that renders a card component with the providred element.
 *
 * @param {Props} element - the element to be rendered within the card
 * @return {JSX.Element} the card component with the provided element
 */
const Card = ({children}) => {
  return <View style={styles.container}>{children}</View>
}

export default Card

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    maxHeight: 80,
  },
})