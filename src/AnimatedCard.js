import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class AnimatedCard extends React.Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);
    this.value = 180;

    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontRotation = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backRotation = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });
    this.backZIndex = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [2, 3],
    });
    this.shadowOpacity = this.animatedValue.interpolate({
      inputRange: [30, 90, 91],
      outputRange: [0, 0.5, 0],
    });
    this.backgroundShadowOpacity = this.animatedValue.interpolate({
      inputRange: [0, 90],
      outputRange: [0.2, 0],
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currentValue !== nextProps.nextValue;
  }

  componentDidUpdate() {
    this.animatedValue.setValue(0);
    this.flipAnimatedCardAnimation();
  }

  flipAnimatedCardAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 180,
      duration: 1000,
    }).start();
  };

  render() {
    const { tens, currentValue, nextValue } = this.props;

    const frontRotationAnimatedStyle = {
      transform: [{ rotateX: this.frontRotation }],
    };
    const frontOpacityAnimatedStyle = {
      opacity: this.frontOpacity,
    };
    const backRotationAnimatedStyle = {
      transform: [{ rotateX: this.backRotation }],
      zIndex: this.backZIndex,
    };
    const backOpacityAnimatedStyle = {
      opacity: this.backOpacity,
    };
    const shadowAnimatedStyle = {
      opacity: this.shadowOpacity,
    };
    const backgroundShadowAnimatedStyle = {
      opacity: this.backgroundShadowOpacity,
    };

    return (
      <View style={[styles.container, tens ? styles.spacer : {}]}>
        {/* Half Top */}
        <View style={[styles.half, styles.top]}>
          {/* Background */}
          <View style={[styles.AnimatedCard, styles.halfTop]}>
            <Text style={[styles.text]}>{nextValue}</Text>
          </View>

          {/* Background Shadow */}
          <Animated.View
            style={[
              styles.AnimatedCard,
              styles.halfTop,
              styles.shadow,
              backgroundShadowAnimatedStyle,
            ]}
          />

          {/* Top Front Shadow */}
          <Animated.View
            style={[
              styles.AnimatedCard,
              styles.halfTop,
              styles.shadow,
              frontRotationAnimatedStyle,
              shadowAnimatedStyle,
            ]}
          />

          {/* Front */}
          <Animated.View
            style={[
              styles.AnimatedCard,
              styles.halfTop,
              frontRotationAnimatedStyle,
              frontOpacityAnimatedStyle,
            ]}
          >
            <Text style={[styles.text]}>{currentValue}</Text>
          </Animated.View>

          {/* Back */}
          <Animated.View
            style={[styles.AnimatedCard, styles.halfTop, styles.back, backRotationAnimatedStyle]}
          >
            <Text style={[styles.text]}>{nextValue}</Text>
          </Animated.View>
        </View>

        <View style={styles.separator} />

        {/* Half Bottom */}
        <View style={[styles.half, styles.bottom]}>
          {/* Front */}
          <Animated.View
            style={[styles.AnimatedCard, styles.halfBottom, frontOpacityAnimatedStyle]}
          >
            <Text style={[styles.text]}>{currentValue}</Text>
          </Animated.View>

          {/* Back */}
          <Animated.View style={[styles.AnimatedCard, styles.halfBottom, backOpacityAnimatedStyle]}>
            {/* next value */}
            <Text style={[styles.text]}>{nextValue}</Text>
          </Animated.View>

          {/* Bottom Shadow */}
          <Animated.View style={[styles.AnimatedCard, styles.halfBottom, shadowAnimatedStyle]} />
        </View>
      </View>
    );
  }
}

AnimatedCard.defaultProps = {
  tens: false,
};

AnimatedCard.propTypes = {
  currentValue: PropTypes.string.isRequired,
  nextValue: PropTypes.string.isRequired,
  tens: PropTypes.bool,
};

const styles = EStyleSheet.create({
  container: {
    width: 30,
    height: 30,
  },
  half: {
    position: 'absolute',
    overflow: 'hidden',
    width: 30,
    height: 15,
    zIndex: 2,
  },
  top: {
    top: 0,
  },
  bottom: {
    top: 15,
  },
  halfTop: {
    position: 'absolute',
    top: 0,
  },
  back: {
    opacity: 0,
  },
  halfBottom: {
    position: 'absolute',
    bottom: 0,
  },
  AnimatedCard: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '$red',
    backfaceVisibility: 'hidden',
  },
  shadow: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000000',
    opacity: 0.2,
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
  separator: {
    position: 'absolute',
    zIndex: 5,
    height: 1,
    width: 30,
    top: 15.5,
    backgroundColor: 'white',
    opacity: 0.5,
  },
});

export default AnimatedCard;
