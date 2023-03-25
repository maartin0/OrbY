import {PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer} from 'three';
import Body from './body';
import './planets';

const scene = new Scene();
const renderer = new WebGLRenderer();
const renderRoot = renderer.domElement;
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
Body.bodies[0].focus();

const raycaster: Raycaster = new Raycaster();
const pointer: Vector2 = new Vector2();

export const listeners: ((iteration: number, sec: number) => void)[] = [];

let iteration: number = 0;
let start: number = Date.now();
let click: boolean = false;
function render(): void {
  raycaster.setFromCamera(pointer, camera);
  const sec: number = (Date.now() - start) / 1000;
  Body.animateAll(iteration, sec, raycaster, click);
  listeners.forEach(l => l(iteration, sec));
  click = false;
  iteration += 1;
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

function updatePointer(e: MouseEvent) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  pointer.y = ( e.clientY / window.innerHeight ) * 2 -1;
}

document.addEventListener('mousemove', (e: MouseEvent) => {
  updatePointer(e);
  if (clickLast) {
    scene.rotation.y += (e.clientX - clickLast.x) / 100;
    scene.rotation.x += (e.clientY - clickLast.y) / 100;
    update(e);
  }
});

renderRoot.addEventListener('click', (e: MouseEvent) => {
  updatePointer(e);
  click = true;
});
