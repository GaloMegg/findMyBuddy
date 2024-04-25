
import { TAB } from '~/utils/navigations';
import { APP_NAVIGATION } from './helper';

/**
 * Renders the navigation component for the app.
 *
 * @return {JSX.Element} The rendered navigation component.
 */
const AppNavigation = () => {
    return (
        <TAB.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false
        }} >
            {APP_NAVIGATION.map(({ name, component, icon }) => (
                <TAB.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        tabBarIcon: () => icon
                    }}
                />
            ))}
        </TAB.Navigator>
    )
}
export default AppNavigation