import useBuddies from '../../../hooks/useBuddies';
import DeleteBuddy from './DeleteBuddy';

/**
 * DeleteBuddiesContainer is a React component that renders a DeleteBuddy component.
 * It takes in two props: closeModal and buddyData.
 *
 * @param {function} closeModal - A function to close the modal.
 * @param {object} buddyData - The data of the buddy to be deleted.
 * @return {JSX.Element} The rendered DeleteBuddy component.
 */
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