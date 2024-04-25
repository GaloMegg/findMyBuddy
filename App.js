import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import LogInContainer from './src/components/auth/login/LogInContainer';
import Navigator from './src/components/navigator/Navigator';
import { store } from './src/store/app/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator styles={styles.container}>
        <LogInContainer />
      </Navigator>
    </Provider>

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
