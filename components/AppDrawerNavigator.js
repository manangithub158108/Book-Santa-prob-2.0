import { createDrawerNavigator } from "react-navigation-drawer";
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingsScreen from '../screens/SettingsScreen';
import Notifications from "../screens/Notifications";

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {screen : AppTabNavigator} ,
    Settings : {screen : SettingsScreen},
    Notifications : {screen : Notifications}
},
{
    contentComponent : CustomSideBarMenu
},
{
    initialRouteName : 'Home',
}
)
