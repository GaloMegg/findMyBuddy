import { TAB } from '~/utils/navigations';
import { COLORS } from '../../../utils/constants';
import { APP_NAVIGATION } from './helper';
/**
 * Renders the navigation component for the app.
 *
 * @return {JSX.Element} The rendered navigation component.
 */
const AppNavigation = () => {
    return (
        <TAB.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: COLORS.BROWN,
                },
                tabBarActiveTintColor: COLORS.LIGHTEST_BROWN,
                tabBarInactiveTintColor: COLORS.LIGH_BROWN,
            }}

        >
            {
                APP_NAVIGATION.map(({ name, component, icon }) => (
                    <TAB.Screen
                        key={name}
                        name={name}
                        component={component}
                        options={({ navigation }) => ({
                            title: name,
                            tabBarIcon: ({ focused }) => (
                                icon(focused ? COLORS.LIGHTEST_BROWN : COLORS.LIGH_BROWN)
                            ),
                        })}

                    />
                ))
            }
        </TAB.Navigator >
    )
}
export default AppNavigation