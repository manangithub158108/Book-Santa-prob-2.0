import {createStackNavigator} from 'react-navigation-stack';
import DonateScreen from '../screens/DonateScreen';
import recieverDetailsScreen from '../screens/recieverDetailsScreen';

export const AppStackNavigator = createStackNavigator({
    BookDonateList : {
        screen : DonateScreen,
        navigationOptions : {
            headerShown : true,
            headerTitle : 'Book Donate List'
        }
    },

    recieverDetails : {
        screen : recieverDetailsScreen,
        navigationOptions : {
            headerShown : false,
            headerTitle : 'Reciever details'
        }
    }
},
{
    initialRouteName : 'BookDonateList'
})

//  AppStackNavigator;