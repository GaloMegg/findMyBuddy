import useSearches from '../../../hooks/useSearches';
import LostBuddy from './LostBuddy';



const LostModalContainer = ({ closeModal, buddyData }) => {
  const { createSearch, loading } = useSearches({})
  return (
    <LostBuddy
      onCreate={async () => {
        await createSearch(buddyData);
        closeModal();
      }}
      loading={loading}
      closeModal={closeModal}
    />
  )
}
export default LostModalContainer