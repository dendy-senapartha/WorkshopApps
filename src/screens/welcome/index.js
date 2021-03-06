import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Logo,
  Text,
  Button,
  StatusBar,
} from '../../components';
import { Colors } from '../../theme';

const Welcome = ({ navigation }) => {
  const {
    container,
    logoContainer,
    actionsContainer,
    welcomeContainer,
  } = styles;
  const { navigate } = navigation;

  return (
    <>
      <StatusBar />
      <SafeAreaView style={container}>
        <View style={{ flex: 1 }}>
          <View style={logoContainer}>
            <Logo />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={welcomeContainer}>
            <View style={{ alignItems: 'center' }}>
              <Text>Welcome to Workshop Apps</Text>
              <Text
                extraLarge
                color={Colors.darkGrey}
                style={{ marginTop: 20 }}
              >
                Get Started.
              </Text>
            </View>
          </View>
          <View style={actionsContainer}>
            <View>
              <Button
                text="Sign In"
                color={Colors.yellowKunyit}
                tintColor={Colors.white}
                onPress={() => navigate('auth')}
              />
            </View>
            <View style={{ alignSelf: 'center' }}>
              <Button
                transparent
                text="Sign Up"
                tintColor={Colors.black}
                onPress={() => navigate('register')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
});

export default Welcome;
