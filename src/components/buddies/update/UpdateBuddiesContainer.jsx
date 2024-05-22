import { useState } from 'react';
import useBuddies from '../../../hooks/useBuddies';
import UpdateBuddy from './UpdateBuddy';



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