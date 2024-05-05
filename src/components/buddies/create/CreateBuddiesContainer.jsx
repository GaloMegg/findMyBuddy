import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateBuddy from './CreateBuddy';
import { createBuddy } from './helper';



const CreateBuddiesContainer = ({ closeModal }) => {
  const { ownerId } = useSelector(state => state.user)
  const [buddyData, setBuddyData] = useState({
    ownerId,
    name: '',
    type: '',
    status: '',
  })

  return (
    <CreateBuddy
      onCreate={() => {
        createBuddy(buddyData);
        closeModal();
      }}
      closeModal={closeModal}
      buddyData={buddyData}
      setbuddyData={setBuddyData}
    />
  )
}
export default CreateBuddiesContainer