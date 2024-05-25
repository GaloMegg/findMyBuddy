import useSearches from '../../../hooks/useSearches';
import FoundBuddy from './FoundBuddy';

/**
 * Renders the FoundBuddiesContainer component.
 *
 * @param {Object} props - The props object.
 * @param {function} props.closeModal - The function to close the modal.
 * @param {Object} props.buddyData - The data of the buddy.
 * @return {JSX.Element} The rendered FoundBuddiesContainer component.
 */
const FoundBuddiesContainer = ({ closeModal, buddyData }) => {
  const { foundBuddy, foundLoading } = useSearches({})
  return (
    <FoundBuddy
      onLabelAsSafe={async () => {
        await foundBuddy(buddyData, closeModal);
      }}
      loading={foundLoading}
      closeModal={closeModal}
    />
  )
}
export default FoundBuddiesContainer