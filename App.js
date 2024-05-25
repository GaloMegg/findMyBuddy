import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';
import { setupDatabase } from './src/clients/sqlDataBase';
import NavigatorContainer from './src/components/navigator/NavigatorContainer';
import { store } from './src/store/app/store';
import { COLORS } from './src/utils/constants';

(async () => {
  await setupDatabase()
})()
/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
export default function App() {
  return (
    <GestureHandlerRootView >
      <Provider store={store}>
        <ToastManager height={50} textStyle={styles.toast} style={styles.toast} position="top" />
        <NavigatorContainer />
      </Provider>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  toast: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.DARK_BROWN,
    fontWeight: '700',
  }
});
