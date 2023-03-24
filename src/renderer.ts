import { PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import './style.css';
import Body from './body';

const scene = new Scene();
const renderer = new WebGLRenderer();
const renderRoot = renderer.domElement;
let camera: PerspectiveCamera;

function refreshUI() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
}
window.addEventListener('resize', refreshUI);
refreshUI();

renderRoot.classList.add('renderRoot');
document.body.appendChild(renderRoot);

new Body().enable();
Body.renderAll(scene);

console.log('ready!');

let t = 0;

function animate() {
  Body.animateAll(t);
  t += 1;
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}

animate();

document.addEventListener('wheel', (e: WheelEvent) => {
  camera.position.z += e.deltaY / 500;
});

let clickLast: { x: number, y: number } | null = null;
const update = (e: MouseEvent) => clickLast = { x: e.x, y: e.y };

document.addEventListener('mousedown', (e: MouseEvent) => {
  update(e);
});

document.addEventListener('mouseup', () => {
  clickLast = null;
});

document.addEventListener('mousemove', (e: MouseEvent) => {
  if (clickLast) {
    scene.rotation.y += (e.x - clickLast.x) / 100;
    scene.rotation.x += (e.y - clickLast.y) / 100;
    update(e);
  }
});
