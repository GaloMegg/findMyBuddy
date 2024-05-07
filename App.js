
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Navigator from './src/components/navigator/Navigator';
import { store } from './src/store/app/store';
export default function App() {
  return (
    <GestureHandlerRootView >
      <Provider store={store}>
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
});
