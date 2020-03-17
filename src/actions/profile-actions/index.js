import auth from '@react-native-firebase/auth';
import { getFileLocalPath } from '~/utils';
import { getUserMinified } from '~/actions/auth-actions';
import storage from '@react-native-firebase/storage';

import {
  UI_EDIT_USER_PROFILE,
  UPDATE_PROFILE_USER_START,
  CANCEL_UPDATE_PROFILE_USER,
  UPDATE_PROFILE_USER_FAIL,
  UPDATE_PROFILE_USER_SUCCESS,
  UPDATE_PROFILE_CHANGE_NAME
} from './types';

const FireBaseStorage = storage();

export const changeName = newName => (dispatch, getState) => {
  const { authReducer } = getState();
  const { user } = authReducer;
  user.name = newName;  
  dispatch({ type: UPDATE_PROFILE_CHANGE_NAME, payload: user });
};

export const cancelEditProfile = ({ navigate }) => (dispatch, getState) => {
  backHandler(navigate);
  navigate('profile');
};

export const backHandler = () => (dispatch, getState) => {
  const currentUser = auth().currentUser;
  dispatch({ type: CANCEL_UPDATE_PROFILE_USER, payload: getUserMinified(currentUser) });
};

export const openEditProfileUI = ({ navigate }) => (dispatch, getState) => {
  dispatch({ type: UI_EDIT_USER_PROFILE });
  navigate('editprofile');
};

export const updateProfile = ({ navigate }, pickedImage) => (dispatch, getState) => {

  const { authReducer } = getState();
  const { user } = authReducer;
  const currentUser = auth().currentUser;

  dispatch({ type: UPDATE_PROFILE_USER_START });

  //if image change
  if (pickedImage.updateImage) {
    console.log("update with image");
    const fileSource = getFileLocalPath(pickedImage);
    const uploadTask = FireBaseStorage.ref("imageProfiles/" + currentUser.uid + ".jpg").putFile(fileSource);
    uploadTask.then((snapshot) => {
      FireBaseStorage.ref(snapshot.metadata.fullPath).getDownloadURL().then((url) => {
        currentUser.updateProfile({
          displayName: user.name,
          photoURL: url
        }).then(() => {
          const userMinified = getUserMinified(auth().currentUser);
          dispatch({ type: UPDATE_PROFILE_USER_SUCCESS, payload: userMinified });
          navigate('profile');
        }).catch(function (error) {
          let errorMessage = '';
          dispatch({ type: UPDATE_PROFILE_USER_FAIL, payload: error });
          console.log("error : ", error);
          navigate('profile');
        });
      });
    });
  } else {
    console.log("update no image");
    currentUser.updateProfile({
      displayName: user.name
    }).then(() => {
      const userMinified = getUserMinified(auth().currentUser);
      dispatch({ type: UPDATE_PROFILE_USER_SUCCESS, payload: userMinified });
      navigate('profile');
    }).catch(function (error) {
      console.log("error : ", error);
      dispatch({ type: UPDATE_PROFILE_USER_FAIL, payload: error });
      navigate('profile');
    });
  }

};

