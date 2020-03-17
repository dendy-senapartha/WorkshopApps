import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from '~/theme';
import { Text, Container } from '~/components';
import { logout } from '~/actions/auth-actions';
import { openEditProfileUI } from '~/actions/profile-actions';
import { MenuConfigItem } from './components';
import auth from '@react-native-firebase/auth';

const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentUser = auth().currentUser;
    //get current user from session
    const {
        user
    } = useSelector(({ authReducer }) => authReducer);

    const [imageUri, setImageURI] = useState({
        uri: null,
        path: ''
    });

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

    return (
        <Container>
            <View style={styles.imageProfileContainer}>
                <Image
                    style={{ marginBottom: 6 }}
                    source={{
                        uri: imageUri.uri,
                        cache: "reload",
                        width: 80, height: 80
                    }}
                />
                <Text numberOfLines={2}>{user != null ? user.name : ""}</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                <View style={styles.separator} />
                <MenuConfigItem
                    icon="edit"
                    description="Edit Profile"
                    onPress={() => dispatch(openEditProfileUI(navigation))}
                />
                <MenuConfigItem
                    icon="git-branch"
                    description="Version"
                    onPress={() => { }}
                    right={<Text>0.0.1</Text>}
                />
                <MenuConfigItem
                    last
                    icon="log-out"
                    description="Logout"
                    onPress={() => dispatch(logout(navigation))}
                />
            </View>
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
    separator: {
        borderBottomColor: Colors.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default Settings;
