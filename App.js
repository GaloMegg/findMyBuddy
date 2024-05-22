import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import ToastManager from 'toastify-react-native';
import { setupDatabase } from './src/clients/sqlDataBase';
import Navigator from './src/components/navigator/Navigator';
import { store } from './src/store/app/store';
import { COLORS } from './src/utils/constants';

(async () => {
  await setupDatabase()
})()
export default function App() {
  return (
    <GestureHandlerRootView >
      <Provider store={store}>
        <ToastManager height={50} textStyle={styles.toast} style={styles.toast} position="top" />
        <Navigator styles={styles.container} />
      </Provider>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    backgroundColor: COLORS.WHITE,
    color: COLORS.DARK_BROWN,
    fontWeight: '700',
  }
});
