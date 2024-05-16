import { useState } from 'react';
import { useSelector } from 'react-redux';
import useBuddies from '../../../hooks/useBuddies';
import CreateBuddy from './CreateBuddy';



const CreateBuddiesContainer = ({ closeModal }) => {
  const { ownerId } = useSelector(state => state.user)
  const { createBuddy, loading } = useBuddies({})
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