import {
    BackSide,
    BoxGeometry,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    Scene,
    TextureLoader,
    Vector2,
    WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { tick } from './loop';

// Renderer setup

export const scene: Scene = new Scene();
export const renderRoot = document.createElement('canvas');
export const renderer: WebGLRenderer = new WebGLRenderer({ canvas: renderRoot });
export let camera: PerspectiveCamera = new PerspectiveCamera(50, 1, 1e-5, 1e10);
export const size: Vector2 = new Vector2();
export const orbitControls: OrbitControls = new OrbitControls(camera, renderRoot);

orbitControls.enableDamping = true;
camera.position.set(0, 8, 10);
renderer.setPixelRatio(window.devicePixelRatio);

renderRoot.classList.add('renderRoot');
renderRoot.width = undefined;
renderRoot.height = undefined;
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
    size.x = renderRoot.clientWidth;
    size.y = renderRoot.clientHeight;
    renderer.setSize(size.x, size.y, false);
    camera.aspect = size.x / size.y;
    camera.updateProjectionMatrix();
}

export function render(): void {
    tick();
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

renderRoot.addEventListener('resize', () => updateSize());
updateSize();
