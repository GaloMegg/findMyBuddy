import useGetBuddies from '../../../hooks/useGetBuddies';
import DeleteBuddy from './DeleteBuddy';

const DeleteBuddiesContainer = ({ closeModal, buddyData }) => {
  const { deleteBuddy, loading } = useGetBuddies({})
  return (
    <DeleteBuddy
      onDelete={async () => {
        await deleteBuddy(buddyData);
        closeModal();
      }}
      loading={loading}
      buddyData={buddyData}
      closeModal={closeModal}
    />
  )
}
export default DeleteBuddiesContainer