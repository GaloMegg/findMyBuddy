import { useState } from 'react';
import useBuddies from '../../../hooks/useBuddies';
import useGetCurrentUser from '../../../hooks/useGetCurrentUser';
import useGetImagePicker from '../../../utils/images';
import CreateBuddy from './CreateBuddy';

/**
 * Creates a container component for creating buddies.
 *
 * @param {function} closeModal - A function to close the modal.
 * @return {JSX.Element} The rendered CreateBuddy component.
 */
const CreateBuddiesContainer = ({ closeModal }) => {
  const { ownerId } = useGetCurrentUser()
  const { createBuddy, createBuddyLoading, errors } = useBuddies({})
  const { pickImage } = useGetImagePicker();
  const [buddyData, setBuddyData] = useState({
    ownerId,
    name: '',
    type: '',
    status: 'SAFE',
  })
  return (
    <CreateBuddy
      pickImage={pickImage}
      onCreate={async () => {
        await createBuddy(buddyData, closeModal);
      }}
      loading={createBuddyLoading}
      errors={errors}
      closeModal={closeModal}
      buddyData={buddyData}
      setbuddyData={setBuddyData}
    />
  )
}
export default CreateBuddiesContainer