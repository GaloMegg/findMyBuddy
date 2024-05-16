import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ViewAllBuddiesContainer from '~/components/buddies/view/viewAll/ViewAllBuddiesContainer';
import ViewOwnerContainer from '../../owners/view/ViewOwnerContainer';
import ViewAllSearchesContainer from '../../searches/view/viewAll/ViewAllSearchesContainer';

export const APP_NAVIGATION = [
    {
        name: 'Home',
        component: ViewAllSearchesContainer,
        icon: <Entypo name="home" size={24} color="black" />
    },
    {
        name: 'Buddies',
        component: ViewAllBuddiesContainer,
        icon: <MaterialIcons name="pets" size={24} color="black" />
    },
    {
        name: 'Profile',
        component: ViewOwnerContainer,
        icon: <Ionicons name="person" size={24} color="black" />
    },

]