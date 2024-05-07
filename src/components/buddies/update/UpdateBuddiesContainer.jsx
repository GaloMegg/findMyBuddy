import { useState } from 'react';
import useGetBuddies from '../../../hooks/useGetBuddies';
import UpdateBuddy from './UpdateBuddy';



const UpdateBuddiesContainer = ({ closeModal, buddyDataInitialValue }) => {
  const [buddyData, setBuddyData] = useState(buddyDataInitialValue)
  const { updateBuddy , loading} = useGetBuddies({})
  return (
    <UpdateBuddy
      onCreate={async () => {
        await updateBuddy(buddyData);
        closeModal();
      }}
      loading={loading}
      closeModal={closeModal}
      buddyData={buddyData}
      setbuddyData={setBuddyData}
    />
  )
}
export default UpdateBuddiesContainer