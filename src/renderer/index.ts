import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import './planets';
import './keybinds';
import { initialise, tick } from '../animationState';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene: Scene = new Scene();
const renderer: WebGLRenderer = new WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const renderRoot: HTMLCanvasElement = renderer.domElement;
const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
const orbitControls: OrbitControls = new OrbitControls(camera, renderRoot);

renderer.setClearColor(0x000000, 0);

window.addEventListener('resize', () => location.reload());

renderRoot.classList.add('renderRoot');
document.getElementById('canvasHolder').appendChild(renderRoot);

camera.position.set(0, 80, 500);

initialise(scene, camera, orbitControls);

function render(): void {
  tick();
  orbitControls.update();
  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

render();
