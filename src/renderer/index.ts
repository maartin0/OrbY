import { AlgorithmProps, PhysicalBody, PhysicalBodyNode } from '../types';
import { render, scene } from './controller';
import { removeLoader } from '../index';
import {
    BufferAttribute,
    BufferGeometry,
    Color,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    SphereGeometry,
    Vector3,
} from 'three';

let selectedBodies: PhysicalBody[] = [];
export const setSelectedBodies = (value: PhysicalBody[]): void => {
    selectedBodies = value;
    updateNodes();
}
let selectedAlgorithms: AlgorithmProps[] = [];
export const setSelectedAlgorithms = (value: AlgorithmProps[]): void => {
    selectedAlgorithms = value;
    updateNodes();
}

export let streakLength: number = 0.2; // TODO add controller

export function enable() {
    removeLoader();
    render();
}

let nodes: PhysicalBodyNode[] = [];

function updateNodes() {
    nodes.forEach((node: PhysicalBodyNode) => {
        node.mesh.removeFromParent();
        node.line.removeFromParent();
    });
    nodes = selectedBodies.flatMap(
        (body: PhysicalBody) =>
            selectedAlgorithms.map(
                (props: AlgorithmProps): PhysicalBodyNode => {
                    const points = Array.from(
                        Array(Math.ceil(
                            body.properties.elements.orbitalPeriodYears * 365.25,
                        )).keys(),
                    ).map((day: number) => props.algorithm(body, day / 365.25));
                    const { r, g, b } = new Color(body.texture.color);
                    const size = Math.ceil(streakLength * points.length);
                    const dist = 1 / size;
                    const gradient = new Float32Array(Array.from(Array(size).keys()).flatMap(n => [r, g, b, 1 - (n * dist)]));
                    return {
                        body,
                        algorithmProps: props,
                        points,
                        mesh: new Mesh(
                            new SphereGeometry(0.01), // TODO body.properties.radiusAu
                            new MeshBasicMaterial({
                                color: body.texture.color,
                                wireframe: false,
                            }),
                        ),
                        line: new Line(
                            new BufferGeometry().setAttribute('color', new BufferAttribute(gradient, 4, true)),
                            new LineBasicMaterial({ vertexColors: true, color: body.texture.color }),
                        ),
                    };
                },
            ));
    nodes.forEach((node: PhysicalBodyNode) => scene.add(node.mesh, node.line));
}

function tickNode(node: PhysicalBodyNode, timeYears: number) {
    const pos: Vector3 = node.algorithmProps.algorithm(node.body, timeYears);
    node.mesh.position.copy(pos);
    const points: Vector3[] = [];
    let pointer: number = 0;
    let min: { distance: number, pointer: number } = undefined;
    for (let point of node.points) {
        const distance: number = point.distanceTo(pos);
        if (!min || distance < min.distance) min = { pointer, distance };
        pointer++;
    }
    pointer = min.pointer;
    const absoluteLength: number = node.points.length * streakLength;
    let i: number = 0;
    while (points.length <= absoluteLength) {
        const newPointer: number = pointer - 1;
        pointer = newPointer < 0 ? node.points.length - 1 : newPointer;
        points.push(node.points[pointer]);
        i++;
    }
    node.line.geometry.setFromPoints(points);
}

export function tickAll(timeYears: number) {
    nodes.forEach(node => tickNode(node, timeYears));
}
