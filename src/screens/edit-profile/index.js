import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '~/theme';
import { Button, LoadingOverlay } from '~/components';
import { Text, Container, TextInput, UploadFile } from '~/components';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { imagePickerOptions, useBackButton } from '~/utils';
import { updateProfile, cancelEditProfile, backHandler } from '~/actions/profile-actions';
import {
    changeName,
} from '~/actions/auth-actions';

const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = auth().currentUser;
    const [imageUri, setImageURI] = useState({
        uri: null,
        path: '',
        updateImage: false
    });

    //button back
    useBackButton(() => dispatch(backHandler()));

    //get current user from session
    const {
        user,
        loading
    } = useSelector(({ authReducer }) => authReducer);

    if (imageUri.uri == null) {
        if (user.photoURL == null) {
            storage().ref('default.png').getDownloadURL().then((url) => {
                setImageURI({
                    ...imageUri,
                    uri: url,
                });
            }
            );
        }
        else {
            setImageURI({
                ...imageUri,
                uri: user.photoURL,
            });
        }
    }

    const uploadFile = () => {
        ImagePicker.showImagePicker(imagePickerOptions, response => {
            if (response.didCancel) {
                //alert('Post canceled');
            } else if (response.error) {
                //alert('An error occurred: ', response.error);
            } else {
                setImageURI({
                    uri: response.uri,
                    path: response.path,
                    updateImage: true
                });
                console.log(
                    'My file response reference is: ', response
                );
            }
        }
        );
    };

    return (
        <Container>
            <View style={styles.imageProfileContainer}>
                <TouchableOpacity onPress={() => uploadFile()}>
                    <Image
                        style={{ marginBottom: 6 }}
                        source={{
                            uri: imageUri.uri,
                            width: 80, height: 80
                        }}
                    />
                </TouchableOpacity>
                <Text numberOfLines={2}>{currentUser.displayName}</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    label="Name"
                    value={user.name}
                    onChangeText={text => dispatch(changeName(text))}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>
            <LoadingOverlay
                loading={loading} />
            <Button
                text="Save"
                color={Colors.yellowKunyit}
                tintColor={Colors.white}
                onPress={() => dispatch(updateProfile(navigation, imageUri))}
            />
            <Button
                text="Cancel"
                color={Colors.lightGrey}
                tintColor={Colors.white}
                onPress={() => dispatch(cancelEditProfile(navigation))}
            />
        </Container>
    );
};

const styles = StyleSheet.create({
    imageProfileContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        paddingHorizontal: 16,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default EditProfile;