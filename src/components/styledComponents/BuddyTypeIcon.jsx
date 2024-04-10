import CAT from 'assets/icons/buddiestype/cat.png'
import DOG from 'assets/icons/buddiestype/dog.png'
import OTHER from 'assets/icons/buddiestype/other.png'

import React from 'react'
import { Image, StyleSheet } from 'react-native'


const buddyTypes = {
  CAT,
  DOG,
  OTHER
}

/**
 * Renders a Buddy Type Icon component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.buddyType - The type of the buddy.
 * @param {number} props.width - The width of the icon.
 * @param {number} props.height - The height of the icon.
 * @return {JSX.Element} The rendered Buddy Type Icon component.
 */
const BuddyTypeIcon = ({ buddyType, width, height }) => {
  return (
    <Image
      resizeMode={'contain'}
      style={{ width, height }}
      source={buddyTypes[buddyType]}
    />
  )
}

export default BuddyTypeIcon

const styles = StyleSheet.create({})
