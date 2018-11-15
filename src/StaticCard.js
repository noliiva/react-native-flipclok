import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const StaticCard = ({ tens, currentValue }) => (
  <View style={[styles.container, tens ? styles.spacer : {}]}>
    <Text style={[styles.text]}>{currentValue}</Text>
  </View>
);

StaticCard.defaultProps = {
  tens: false,
};

StaticCard.propTypes = {
  currentValue: PropTypes.string.isRequired,
  tens: PropTypes.bool,
};

const styles = EStyleSheet.create({
  container: {
    width: 30,
    height: 30,
    backgroundColor: '$red',
    justifyContent: 'center',
    borderRadius: 5,
  },
  text: {
    fontSize: '$large',
    fontFamily: '$bold',
    textAlign: 'center',
    color: '$white',
  },
  spacer: {
    marginRight: 1.5,
  },
});

export default StaticCard;
