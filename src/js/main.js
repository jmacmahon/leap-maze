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

var imD = new ImageData;
var x = new int 0;
var z = new int 0;
const h = circ.getHeight();
const w = circ.getWidth();

var bg = document.getElementById('wireA.jpg');
var wire = new fabric.Image(bg, {left: 0, top: 0, angle: 0, opacity: 1});
canvas.add(wire);
var cxt = canvas.getContext('2d');

const black = new Color().rbg(1, 1, 1);
const red = new Color().rbg(255, 0, 0);
const orange = new Color().rbg(255, 158, 0);

  loop((frame)) => {
    const xz = getXZ(frame);
    x = xz[0];
    z = xz[1];
    imD = cxt.getImageData(x, z, w, h);
    var onColor = Color().rbg(imD.data[0], imD.data[1], imD.data[2]);
    if(onColor.red() === black.red() && onColor.green() === black.green() && onColor.blue() === black.blue()){
      document.getElementById('test').innerHTML = 'good';
    } elseif(onColor.red() === red.red() && onColor.green() === red.green() && onColor.blue() === red.blue()){
      document.getElementById('test').innerHTML = 'bad';
    } elseif(onColor.red() === orange.red() && onColor.green() === orange.green() && onColor.blue() === orange.blue()){
      document.getElementById('test').innerHTML = 'okay';
    } else {
      document.getElementById('test').innerHTML = 'error';
    }

  }
