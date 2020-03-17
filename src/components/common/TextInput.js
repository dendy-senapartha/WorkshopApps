import React from 'react';
import {
  View,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../theme';
import Text from './Text';

const propTypes = {
  label: PropTypes.string.isRequired,
};

const TextInput = ({ label, ...props }) => {
  const { container, textLabel, textInputStyle } = styles;

  return (
    <View style={container}>
      <Text
        small
        style={textLabel}
      >
        {label}
      </Text>
      <RNTextInput
        style={textInputStyle}
        selectionColor={Colors.darkGrey}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  textLabel: {
    color: Colors.lightGrey,   
    paddingHorizontal: 4,
  },
  textInputStyle: {
    color: Colors.darkGrey,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: Colors.lightGrey,
    paddingVertical: 4,
  },
});

TextInput.propTypes = propTypes;

export default TextInput;
