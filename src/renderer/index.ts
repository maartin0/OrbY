import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Body from './body';
import './planets';
import { tick } from '../animationState';

const scene: Scene = new Scene();
const renderer: WebGLRenderer = new WebGLRenderer();
const renderRoot: HTMLCanvasElement = renderer.domElement;
let camera: PerspectiveCamera;

function refreshUI() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

}
window.addEventListener('resize', refreshUI);
refreshUI();

renderRoot.classList.add('renderRoot');
document.body.appendChild(renderRoot);

Body.renderAll(scene, camera);

function render(): void {
  tick();
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

render();

document.addEventListener('wheel', (e: WheelEvent) => {
  camera.position.z += e.deltaY / 10;
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
    scene.rotation.y += (e.clientX - clickLast.x) / 100;
    scene.rotation.x += (e.clientY - clickLast.y) / 100;
    update(e);
  }
});
