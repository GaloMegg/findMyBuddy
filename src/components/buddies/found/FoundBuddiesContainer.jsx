import useSearches from '../../../hooks/useSearches';
import FoundBuddy from './FoundBuddy';



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