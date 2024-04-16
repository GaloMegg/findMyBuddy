import { StyleSheet } from 'react-native';
import LogInContainer from './src/components/auth/login/LogInContainer';
import Navigator from './src/components/navigator/Navigator';

export default function App() {
  return (
    <Navigator styles={styles.container}>
      <LogInContainer />
    </Navigator>
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
