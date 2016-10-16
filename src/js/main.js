import { fabric } from 'fabric';
import { getXZ, loop } from './leapmotion';

// points
function score(color) {
  const r = color[0];
  const g = color[1];
  const b = color[2];
  if (r === 0 && g === 0 && b === 0) {
    return 100;
  }
  if (r === 255 && g === 148 && b === 0) {
    return 10;
  }
  if (r === 255 && g === 0 && b === 0) {
    return -100;
  }
  return 0;
}

const SCALE = 2;

const canvas = new fabric.Canvas('canvas').setDimensions({
  width: 300 * SCALE,
  height: 300 * SCALE,
});

const imgElement = document.getElementById('my-image');
const img = new fabric.Image(imgElement, {
  left: 0,
  top: 0,
  angle: 0,
  opacity: 1,
});
canvas.add(img);

const circ = new fabric.Circle({
  left: (canvas.getWidth()),
  top: (canvas.getHeight()),
  fill: 'blue',
  radius: 5 * SCALE,
});
canvas.add(circ);
circ.bringToFront();

const canvas2 = document.getElementById('canvas');
const cxt = canvas2.getContext('2d');
let points = 0;

loop((frame) => {
  circ.bringToFront();
  const xz = getXZ(frame);
  if (xz !== null) {
    const x = (canvas.getWidth() / 2) + (xz[0] * SCALE);
    const z = (canvas.getHeight() / 2) + (xz[1] * SCALE);
    circ.visible = true;
    circ.setLeft(x);
    circ.setTop(z);
    const imD = cxt.getImageData(x - 10, z - 10, 1, 1);
    const color = [imD.data[0], imD.data[1], imD.data[2]];
    points += score(color);
    document.getElementById('test').innerHTML = points.toString();
  }
  canvas.renderAll();
});
