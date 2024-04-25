import LogInContainer from '../../auth/login/LogInContainer';
import { SCREENS_CONSTANTS } from '../helper';
const AuthNavigation = () => {
    return (
        <STACK.Navigator>
            <STACK.Screen name={SCREENS_CONSTANTS.LOG_IN} component={LogInContainer} />
            <STACK.Screen name={SCREENS_CONSTANTS.SIGN_UP} component={LogInContainer} />
        </STACK.Navigator>
    )
}
export default AuthNavigation