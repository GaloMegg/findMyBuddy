import { useState } from 'react';
import { useSelector } from 'react-redux';
import useGetBuddies from '../../../hooks/useGetBuddies';
import CreateBuddy from './CreateBuddy';



const CreateBuddiesContainer = ({ closeModal }) => {
  const { ownerId } = useSelector(state => state.user)
  const { createBuddy, loading } = useGetBuddies({})
  const [buddyData, setBuddyData] = useState({
    ownerId,
    name: '',
    type: '',
    status: '',
  })

  return (
    <CreateBuddy
      onCreate={async () => {
        await createBuddy(buddyData);
        closeModal();
      }}
      loading={loading}
      closeModal={closeModal}
      buddyData={buddyData}
      setbuddyData={setBuddyData}
    />
  )
}
export default CreateBuddiesContainer