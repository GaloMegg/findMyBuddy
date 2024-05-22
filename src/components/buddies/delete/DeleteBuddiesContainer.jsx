import useBuddies from '../../../hooks/useBuddies';
import DeleteBuddy from './DeleteBuddy';

const DeleteBuddiesContainer = ({ closeModal, buddyData }) => {
  const { deleteBuddy, deleteBuddyLoading } = useBuddies({})
  return (
    <DeleteBuddy
      onDelete={async () => {
        await deleteBuddy(buddyData, closeModal);
      }}
      loading={deleteBuddyLoading}
      buddyData={buddyData}
      closeModal={closeModal}
    />
  )
}
export default DeleteBuddiesContainer