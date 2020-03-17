import React, { useState } from 'react';
import { StatusBar, Image } from 'react-native';
import { Button } from './Button';
import { Container} from './Container';
import { Text } from './Text';
import ImagePicker from 'react-native-image-picker';
import { Colors } from '../../theme';

const UploadFile = () => {
  const [imageURI, setImageURI] = useState(null);

  const imagePickerOptions = {
    noData: true,
  };

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      if (response.didCancel) {
        alert('Post canceled');
      } else if (response.error) {
        alert('An error occurred: ', response.error);
      } else {
        setImageURI({ uri: response.uri });
        console.log(response);
      }
    }
    );
  };
  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <Button
        text="Upload"
        color={Colors.yellowKunyit}
        onPress={() => {
          uploadFile
        }}
      />
    
    </Container>
  );
};
export default UploadFile;