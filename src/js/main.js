import { fabric } from 'fabric';
import { getXZ, loop } from './leapmotion';

const SCALE = 2;

const canvas = new fabric.Canvas('canvas').setDimensions({
  width: 400 * SCALE,
  height: 200 * SCALE,
});

const circ = new fabric.Circle({
  left: (canvas.getWidth() / 2),
  top: (canvas.getHeight() / 2),
  fill: 'red',
  radius: 5 * SCALE,
});

let path;

fabric.loadSVGFromURL('/wires/wire1.svg', (objects, options) => {
  path = fabric.util.groupSVGElements(objects, options);
  path.scale(canvas.getHeight() / (path.getHeight() + 0.0));
  path.setLeft(
    (canvas.getWidth() / 2.0) - (path.getWidth() / 2.0)
  );
  canvas.add(path).renderAll();
});

canvas.add(circ);
circ.bringToFront();

loop((frame) => {
  const xz = getXZ(frame);
  if (xz === null) {
    circ.visible = false;
  } else {
    circ.visible = true;
    circ.setLeft((canvas.getWidth() / 2) + (xz[0] * SCALE));
    circ.setTop((canvas.getHeight() / 2) + (xz[1] * SCALE));
    if (circ.intersectsWithObject(path)) {
      document.getElementById('test').innerHTML = 'intersects';
    } else {
      document.getElementById('test').innerHTML = 'not intersects';
    }
  }
  canvas.renderAll();
});
