import useSearches from '../../../hooks/useSearches';
import FoundBuddy from './FoundBuddy';



const FoundBuddiesContainer = ({ closeModal, buddyData }) => {
  const { foundEmail, sendFoundEmail } = useSearches({})
  return (
    <FoundBuddy
      onLabelAsSafe={async () => {
        await sendFoundEmail(buddyData, closeModal);
      }}
      loading={foundEmail}
      closeModal={closeModal}
    />
  )
}
export default FoundBuddiesContainer