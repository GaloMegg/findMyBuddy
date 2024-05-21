import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ViewAllBuddiesContainer from '~/components/buddies/view/viewAll/ViewAllBuddiesContainer';
import ViewOwnerContainer from '../../owners/view/ViewOwnerContainer';
import ViewAllSearchesContainer from '../../searches/view/viewAll/ViewAllSearchesContainer';

export const APP_NAVIGATION = [
    {
        name: 'Searches',
        component: ViewAllSearchesContainer,
        icon: (color) => <Entypo name="home" size={24} color={color} />
    },
    {
        name: 'Buddies',
        component: ViewAllBuddiesContainer,
        icon: (color) => <MaterialIcons name="pets" size={24} color={color} />
    },
    {
        name: 'Profile',
        component: ViewOwnerContainer,
        icon: (color) => <Ionicons name="person" size={24} color={color} />
    },

]