import React from 'react';
import { Image } from 'react-native';
import MainLogo from '~/assets/profile-default.png';

const Logo = () => (
  <Image
    source={MainLogo}
    resizeMode="stretch"
    style={{ width: 140, height: 140 }}
  />
);

export default Logo;
