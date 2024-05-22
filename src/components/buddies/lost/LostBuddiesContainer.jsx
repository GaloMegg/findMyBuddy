import useSearches from '../../../hooks/useSearches';
import LostBuddy from './LostBuddy';



const LostModalContainer = ({ closeModal, buddyData }) => {
  const { createSearch, loadingCreate } = useSearches({})
  return (
    <LostBuddy
      onLabelAsLost={async () => {
        await createSearch(buddyData, closeModal);
      }}
      loading={loadingCreate}
      closeModal={closeModal}
    />
  )
}
export default LostModalContainer