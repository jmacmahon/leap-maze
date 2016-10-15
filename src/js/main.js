import { fabric } from 'fabric';
import { getXZ, loop } from './leapmotion';

const canvas = new fabric.Canvas('canvas');

const rect = new fabric.Circle({
  left: 100,
  top: 100,
  fill: 'red',
  radius: 10,
});

canvas.add(rect);

loop((frame) => {
  const xz = getXZ(frame);
  if (xz === null) {
    rect.visible = false;
  } else {
    rect.visible = true;
    rect.left = 100 + xz[0];
    rect.top = 100 + xz[1];
  }
  canvas.renderAll();
});
