import useBuddies from '../../../hooks/useBuddies';
import DeleteBuddy from './DeleteBuddy';

const DeleteBuddiesContainer = ({ closeModal, buddyData }) => {
  const { deleteBuddy, loading } = useBuddies({})
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