import { useEffect } from 'react';
import { Platform, BackHandler } from 'react-native';
import storage from '@react-native-firebase/storage';

const FireBaseStorage = storage();

export const imagePickerOptions = {
    noData: true,
};

export const getFileLocalPath = realFile => {
    const { path, uri } = realFile;
    return Platform.OS === 'android' ? path : uri;
};

export const createStorageReferenceFromFile = realFile => {
    const { fileName } = realFile;
    return FireBaseStorage.ref(fileName);
};

export const uploadFileToFireBase = (realFile, destFileName) => {
    const fileSource = getFileLocalPath(realFile);
    const storageRef = FireBaseStorage.ref("imageProfiles/" + destFileName + ".jpg");
    return storageRef.putFile(fileSource);
};

export const useBackButton = (handler) => {
    useEffect(() => {
        //add the listener to the component
        BackHandler.addEventListener("hardwareBackPress", handler);

        return () => {
            //remove the listener to the component
            //replacement for componentWillUnmount
            BackHandler.removeEventListener(
                "hardwareBackPress",
                handler
            );
        };
    }, [handler]);
};