import { createStackNavigator } from 'react-navigation-stack';
import { Profile, EditProfile } from '~/screens';
import { Colors } from '../theme';

const stack = createStackNavigator({
  profile: Profile,
  editprofile: EditProfile,
}, {
  initialRouteName: 'profile',
  defaultNavigationOptions: ({ navigation: { state } }) => {
    return {
      header: null,
      /*
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
        backgroundColor: Colors.black,
      },
      headerTintColor: Colors.white,*/
    };

  },
});

export default stack;
