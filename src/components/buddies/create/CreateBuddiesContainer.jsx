import { useState } from 'react';
import useBuddies from '../../../hooks/useBuddies';
import useGetCurrentUser from '../../../hooks/useGetCurrentUser';
import CreateBuddy from './CreateBuddy';



const CreateBuddiesContainer = ({ closeModal }) => {
  const { ownerId } = useGetCurrentUser()
  const { createBuddy, loading, errors } = useBuddies({})
  const [buddyData, setBuddyData] = useState({
    ownerId,
    name: '',
    type: '',
    status: 'SAFE',
  })
  return (
    <CreateBuddy
      onCreate={async () => {
        await createBuddy(buddyData, closeModal);
      }}
      loading={loading}
      errors={errors}
      closeModal={closeModal}
      buddyData={buddyData}
      setbuddyData={setBuddyData}
    />
  )
}
export default CreateBuddiesContainer