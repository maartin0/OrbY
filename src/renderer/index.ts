import './planets';
import './keybinds';

import { initialise, tick } from '../animationState';
import { PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const scene: Scene = new Scene();
export const renderer: WebGLRenderer = new WebGLRenderer();
export const renderRoot: HTMLCanvasElement = renderer.domElement;
export let camera: PerspectiveCamera = new PerspectiveCamera(75, 1, 0.001, 1000);
export const size: Vector2 = new Vector2();
export const orbitControls: OrbitControls = new OrbitControls(camera, renderRoot);

orbitControls.enableDamping = true;
camera.position.set(0, 8, 10);
renderer.setPixelRatio(window.devicePixelRatio);

renderRoot.classList.add('renderRoot');
document.body.appendChild(renderRoot);

updateSize();
initialise();
render();

export function updateSize(): void {
  size.x = renderRoot.clientWidth;
  size.y = renderRoot.clientHeight;
  renderer.setSize(size.x, size.y, false);
  camera.aspect = size.x / size.y;
  camera.updateProjectionMatrix();
}

function render(): void {
  tick();
  // updateSize();
  orbitControls.update();
  renderer.render( scene, camera );
  requestAnimationFrame( render );
}

window.addEventListener('resize', () => updateSize());



