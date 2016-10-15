import Leap from 'leapjs';
import _ from 'lodash';

function getXZ(frame) {
  const data = _.chain(frame.fingers)
  .filter(finger => finger.extended)
  .head()
  .value();
  if (data === undefined) {
    return null;
  }
  return [
    data.tipPosition[0],
    data.tipPosition[2],
  ];
}

function loop(cb) {
  Leap.loop(cb);
}

module.exports = {
  loop,
  getXZ,
};
