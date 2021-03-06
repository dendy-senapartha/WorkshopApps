import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Auth from './Auth';
import Main from './Main';
import { Loading } from '../screens';

/**
 * used to intiate the first screen to be shown
 **/

const nav = createSwitchNavigator({
  auth: Auth,
  main: Main,
  loading: Loading,
}, {
  initialRouteName: 'loading',
});

export default createAppContainer(nav);
