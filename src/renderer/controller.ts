import {
    BackSide,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    TextureLoader,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { tick } from './loop';

// Renderer setup

export const scene: Scene = new Scene();
export const renderRoot: HTMLCanvasElement = document.createElement('canvas');
export const renderer: WebGLRenderer = new WebGLRenderer({ canvas: renderRoot });
export let camera: PerspectiveCamera = new PerspectiveCamera(50, 1, 1e-5, 1e10);
export const orbitControls: OrbitControls = new OrbitControls(camera, renderRoot);

orbitControls.enableDamping = true;
camera.position.set(0, 15, 30);
renderer.setPixelRatio(window.devicePixelRatio);

renderRoot.classList.add('renderRoot');
document.body.appendChild(renderRoot);

// Skybox setup
scene.add(new Mesh(
    new BoxGeometry(10000, 10000, 10000),
    ['back', 'bottom', 'front', 'left', 'right', 'top']
        .map(name => `skybox/${name}.png`)
        .map(path => new TextureLoader().load(path))
        .map(texture => new MeshBasicMaterial({ map: texture, side: BackSide })),
));

// Lifecycle methods
export function updateSize(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;
    renderRoot.width = width;
    renderRoot.height = height;
    renderRoot.style.width = `${width}px`;
    renderRoot.style.height = `${height}px`;
    renderer.setSize(width, height, true);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

export function render(): void {
    tick();
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

window.addEventListener('resize', () => updateSize());
updateSize();
