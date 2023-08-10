import bodies from './bodies';
import { PhysicalBody, PhysicalBodyAlgorithm, PhysicalBodyNode } from '../types';
import algorithms from './orbits';
import { render, scene } from './controller';
import { removeLoader } from '../index';
import { BufferGeometry, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';

function updateSelected<T>(set: Set<T>, object: T, selected: boolean): void {
    if (selected) set.add(object);
    else set.delete(object);
    updateNodes();
}

export const selectedBodies: Set<PhysicalBody> = new Set(Object.values(bodies));
export const setBodySelected = (body: PhysicalBody, selected: boolean): void => updateSelected(selectedBodies, body, selected);

export const selectedAlgorithms: Set<PhysicalBodyAlgorithm> = new Set(Object.values(algorithms).filter(a => a.default).map(a => a.algorithm));
export const setAlgorithmSelected = (algorithm: PhysicalBodyAlgorithm, selected: boolean): void => updateSelected(selectedAlgorithms, algorithm, selected);

export let streakLength: number = 1; // TODO add controller

export function enable() {
    updateNodes();
    removeLoader();
    render();
}

let nodes: PhysicalBodyNode[] = [];

function updateNodes() {
    console.log('update', selectedBodies.size, selectedAlgorithms.size);
    nodes.forEach((node: PhysicalBodyNode) => {
        node.mesh.removeFromParent();
        node.line.removeFromParent();
    });
    nodes = Array.from(selectedBodies).flatMap(
        (body: PhysicalBody) =>
            Array.from(selectedAlgorithms).map(
                (algorithm: PhysicalBodyAlgorithm): PhysicalBodyNode =>
                    ({
                        body,
                        algorithm,
                        mesh: new Mesh(
                            new SphereGeometry(0.01), // body.properties.radiusAu
                            new MeshBasicMaterial({
                                color: body.texture.color,
                                wireframe: false,
                            }),
                        ),
                        line: new Line(
                            new BufferGeometry().setFromPoints(
                                Array.from(
                                    Array(Math.round(
                                        body.properties.elements.orbitalPeriodYears * 365.25
                                    )).keys()
                                ).map((day: number) => algorithm(body, day / 365.25))),
                            new LineBasicMaterial({ color: body.texture.color }),
                        ),
                    }),
            ));
    nodes.forEach((node: PhysicalBodyNode) => scene.add(node.mesh, node.line));
}

const ORIGIN = new Vector3(0, 0, 0);

function tickNode(node: PhysicalBodyNode, timeYears: number) {
    const pos: Vector3 = node.algorithm(node.body, timeYears);
    node.mesh.position.copy(pos);
}

export function tickAll(timeYears: number) {
    nodes.forEach(node => tickNode(node, timeYears));
}
