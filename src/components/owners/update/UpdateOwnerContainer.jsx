import { useState } from 'react';
import useOwners from '../../../hooks/useOwner';
import UpdateOwner from './UpdateOwner';


const UpdateOwnerContainer = ({ closeModal, ownerInitialData }) => {
  const [ownerData, setOwnerData] = useState(ownerInitialData)
  const { updateOwner, updateOwnerLoader, errors } = useOwners({})
  return (
    <UpdateOwner
      onUpdate={async () => {
        console.log(ownerData)
        await updateOwner(ownerData, closeModal);
      }}
      errors={errors}
      loading={updateOwnerLoader}
      closeModal={closeModal}
      ownerData={ownerData}
      setOwnerData={setOwnerData}
    />
  )
}
export default UpdateOwnerContainer