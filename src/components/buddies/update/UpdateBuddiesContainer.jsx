import { useState } from 'react';
import useBuddies from '../../../hooks/useBuddies';
import UpdateBuddy from './UpdateBuddy';

/**
 * Renders the UpdateBuddiesContainer component.
 *
 * @param {Object} props - The props object.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {Object} props.buddyDataInitialValue - The initial value of the buddy data.
 * @return {JSX.Element} The rendered UpdateBuddiesContainer component.
 */
const UpdateBuddiesContainer = ({ closeModal, buddyDataInitialValue }) => {
  const [buddyData, setBuddyData] = useState(buddyDataInitialValue)
  const { updateBuddy, updateBuddyLoading, errors } = useBuddies({})
  return (
    <UpdateBuddy
      buddyData={buddyData}
      closeModal={closeModal}
      errors={errors}
      loading={updateBuddyLoading}
      onUpdate={async () => { await updateBuddy(buddyData, closeModal); }}
      setbuddyData={setBuddyData}
    />
  )
}
export default UpdateBuddiesContainer