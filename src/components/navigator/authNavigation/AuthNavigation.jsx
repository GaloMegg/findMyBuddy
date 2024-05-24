import LogInContainer from '~/components/auth/login/LogInContainer';
import SignUpContainer from '~/components/auth/signup/SignUpContainer';
import { STACK } from '~/utils/navigations';
import { SCREENS_CONSTANTS } from './helper';
const AuthNavigation = () => {
    return (
        <STACK.Navigator initialRouteName={SCREENS_CONSTANTS.LOG_IN}
        name='LOGIN' 
        screenOptions={{
            headerShown: false,
        }}>
            <STACK.Screen name={SCREENS_CONSTANTS.LOG_IN} component={LogInContainer} />
            <STACK.Screen name={SCREENS_CONSTANTS.SIGN_UP} component={SignUpContainer} />
        </STACK.Navigator>
    )
}
export default AuthNavigation