import { useState } from 'react';
import useOwners from '../../../hooks/useOwner';
import UpdateOwner from './UpdateOwner';

/**
 * Container component for updating owner information.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {Object} props.ownerInitialData - The initial data of the owner.
 * @return {JSX.Element} The rendered container component.
 */
const UpdateOwnerContainer = ({ closeModal, ownerInitialData }) => {
  const [ownerData, setOwnerData] = useState(ownerInitialData)
  const { updateOwner, updateOwnerLoader, errors } = useOwners({})
  return (
    <UpdateOwner
      onUpdate={async () => {
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