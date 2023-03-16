import {Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer} from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.95);
document.body.appendChild(renderer.domElement);

const center = new Mesh(
    new SphereGeometry(1),
    new MeshBasicMaterial({
        color: 0xf8fc03,
        wireframe: true,
    }),
);
const orbit = new Mesh(
    new SphereGeometry(0.5),
    new MeshBasicMaterial({
        color: 0x3a7840,
        wireframe: true,
    }),
);
scene.add(center);
scene.add(orbit);
camera.position.z = 5;

console.log('ready!');

let t = 0;

function animate() {
    t = (t + 0.1) % (Math.PI * 2);
    orbit.position.x = 2 * Math.cos(t);
    orbit.position.z = 2 * Math.sin(t);
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

document.addEventListener('mouseup', (e: MouseEvent) => {
    clickLast = null;
});

document.addEventListener('mousemove', (e: MouseEvent) => {
    if (clickLast) {
        scene.rotation.y += (e.x - clickLast.x) / 100;
        scene.rotation.x += (e.y - clickLast.y) / 100;
        update(e);
    }
});
