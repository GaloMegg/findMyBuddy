import useSearches from '../../../hooks/useSearches';
import LostBuddy from './LostBuddy';

/**
 * Renders a modal container for labeling a buddy as lost.
 *
 * @param {function} closeModal - A function to close the modal.
 * @param {object} buddyData - The data of the buddy to be labeled as lost.
 * @return {JSX.Element} The rendered LostBuddy component.
 */
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