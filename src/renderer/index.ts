import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import './planets';
import { initialise, tick } from '../animationState';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene: Scene = new Scene();
const renderer: WebGLRenderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const renderRoot: HTMLCanvasElement = renderer.domElement;
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const orbitControls: OrbitControls = new OrbitControls(camera, renderRoot);

renderer.setClearColor(0x000000, 0);

window.addEventListener('resize', () => location.reload());

renderRoot.classList.add('renderRoot');
document.body.appendChild(renderRoot);

camera.position.set(0, 20, 100);

initialise(scene, camera, orbitControls);

function render(): void {
  tick();
  orbitControls.update();
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

render();

/* document.addEventListener('wheel', (e: WheelEvent) => {
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
*/
