import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ViewAllBuddiesContainer from '~/components/buddies/view/viewAll/ViewAllBuddiesContainer';

export const APP_NAVIGATION = [
    {
        name: 'Home',
        component: ViewAllBuddiesContainer,
        icon: <Entypo name="home" size={24} color="black" />
    },
    {
        name: 'Buddies',
        component: ViewAllBuddiesContainer,
        icon: <MaterialIcons name="pets" size={24} color="black" />
    },
    {
        name: 'Profile',
        component: ViewAllBuddiesContainer,
        icon: <Ionicons name="person" size={24} color="black" />
    },

]