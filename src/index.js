import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { startOfTomorrow, subSeconds, addSeconds, format, getMilliseconds } from 'date-fns';

import StaticCard from './StaticCard';
import AnimatedCard from './AnimatedCard';

class FlipClock extends React.Component {
  constructor(props) {
    super(props);

    const currentTime = startOfTomorrow() - new Date(); // new Date().setHours(1, 0, 0);
    this.state = {
      currentTime: addSeconds(currentTime, 1),
      nextTime: currentTime,
    };
  }

  componentDidMount() {
    setTimeout(() =>
      this.updateTime(() => {
        this.timerHandle = setInterval(this.updateTime, 1000);
      }, 1000 - getMilliseconds(this.state.currentTime))
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerHandle);
  }

  updateTime = (callback) => {
    this.setState(
      (state) => ({
        currentTime: subSeconds(state.currentTime, 1),
        nextTime: subSeconds(state.nextTime, 1),
      }),
      callback
    );
  };

  render() {
    const { animated, style } = this.props;
    const { currentTime, nextTime } = this.state;

    const currentHours = format(currentTime, 'HH').split('');
    const currentMinutes = format(currentTime, 'mm').split('');
    const currentSeconds = format(currentTime, 'ss').split('');

    const nextHours = format(nextTime, 'HH').split('');
    const nextMinutes = format(nextTime, 'mm').split('');
    const nextSeconds = format(nextTime, 'ss').split('');

    const reference = format(currentTime, 'HH:mm:ss');

    const Card = animated ? AnimatedCard : StaticCard;

    return (
      <View style={[styles.container, style]}>
        <Card
          name="[H]H:mm:ss"
          reference={reference}
          currentValue={currentHours[0]}
          nextValue={nextHours[0]}
          tens
        />
        <Card
          name="H[H]:mm:ss"
          reference={reference}
          currentValue={currentHours[1]}
          nextValue={nextHours[1]}
        />
        <Text style={[styles.text, styles.outerText]}> h </Text>

        <Card
          name="HH:[m]m:ss"
          reference={reference}
          currentValue={currentMinutes[0]}
          nextValue={nextMinutes[0]}
          tens
        />
        <Card
          name="HH:m[m]:ss"
          reference={reference}
          currentValue={currentMinutes[1]}
          nextValue={nextMinutes[1]}
        />
        <Text style={[styles.text, styles.outerText]}> m </Text>

        <Card
          name="HH:mm:[s]s"
          reference={reference}
          currentValue={currentSeconds[0]}
          nextValue={nextSeconds[0]}
          tens
        />
        <Card
          name="HH:mm:s[s]"
          reference={reference}
          currentValue={currentSeconds[1]}
          nextValue={nextSeconds[1]}
        />
        <Text style={[styles.text, styles.outerText]}> s</Text>
      </View>
    );
  }
}

FlipClock.defaultProps = {
  animated: false,
  style: {},
};

FlipClock.propTypes = {
  animated: PropTypes.bool,
  style: PropTypes.object,
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: '$large',
    fontFamily: '$regular',
    color: '$red',
  },
  spacer: {
    marginLeft: 1,
  },
});

export default FlipClock;
