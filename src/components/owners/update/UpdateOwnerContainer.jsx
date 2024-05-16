import { useState } from 'react';
import useBuddies from '../../../hooks/useBuddies';
import UpdateBuddy from './UpdateOwner';



const UpdateOwnerContainer = ({ closeModal, ownerInitialData }) => {
  const [ownerData, setOwnerData] = useState(ownerInitialData)
  const { updateBuddy , loading} = useBuddies({})
  return (
    <UpdateBuddy
      onCreate={async () => {
        await updateOwner(ownerData);
        closeModal();
      }}
      loading={loading}
      closeModal={closeModal}
      ownerData={ownerData}
      setOwnerData={setOwnerData}
    />
  )
}
export default UpdateOwnerContainer