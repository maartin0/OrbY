import { AlgorithmProps, PhysicalBody, PhysicalBodyNode, PhysicalBodyType } from '../types';
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
import { loopState } from './loop';

export const SPEED_OPTIONS = [
    {
        value: 1,
        label: 'Normal',
    },
    {
        value: 60,
        label: '1 minute / s',
    },
    {
        value: 3600,
        label: '1 hour / s',
    },
    {
        value: 86400,
        label: '1 day / s',
    },
    {
        value: 2592000,
        label: '1 month / s',
    },
    {
        value: 31557600,
        label: '1 year / s',
    },
    {
        value: 315576000,
        label: '10 years / s',
    },
];

export const controls: {
    streak: {
        length: number,
    }
    speedIndex: number,
    scale: {
        real: boolean,
        value: number,
    },
    selectedBodies: PhysicalBody[],
    selectedAlgorithms: AlgorithmProps[],
} = {
    streak: {
        length: 0.7,
    },
    speedIndex: 0,
    scale: {
        real: true,
        value: 1,
    },
    selectedBodies: [],
    selectedAlgorithms: [],
}

export function enable() {
    removeLoader();
    render();
}

export let nodes: PhysicalBodyNode[] = [];
let updateListeners: (() => void)[] = [];
export const updateSubscribe = (listener: () => void) => {
    updateListeners.push(listener);
    return () => { updateListeners = updateListeners.filter(v => v !== listener) };
}

export function getPos(node: { body: PhysicalBody, algorithmProps: AlgorithmProps }, timeYears: number): Vector3 {
    const focusTarget: PhysicalBodyNode = nodes[0];
    if (!focusTarget || focusTarget.body.id === node.body.id) return new Vector3(0, 0, 0);
    else return node.algorithmProps.algorithm(node.body, timeYears).sub(focusTarget.algorithmProps.algorithm(focusTarget.body, timeYears));
}

export function update() {
    loopState.speed = SPEED_OPTIONS[controls.speedIndex].value;
    nodes.forEach((node: PhysicalBodyNode) => {
        node.mesh.removeFromParent();
        node.line.removeFromParent();
    });
    nodes = controls.selectedAlgorithms.flatMap(
        (algorithmProps: AlgorithmProps) =>
            controls.selectedBodies.map(
                (body: PhysicalBody): PhysicalBodyNode => {
                    const points = Array.from(
                        Array(Math.ceil(
                            body.properties.elements.orbitalPeriodYears * 365.25 * (controls.streak.length > 1 ? controls.streak.length : 1),
                        )).keys(),
                    ).map((day: number) => getPos({ body, algorithmProps }, day / 365.25));
                    const mesh = new Mesh(
                        new SphereGeometry(controls.scale.value * (
                            controls.scale.real
                            ? body.properties.radiusAu
                            : (body.type === PhysicalBodyType.STAR ? 0.1 : 0.03)
                        )),
                        new MeshBasicMaterial({
                            color: body.texture.color,
                            wireframe: false,
                        }),
                    );
                    const line = controls.streak.length < 1 ? (() => {
                        const { r, g, b } = new Color(body.texture.color);
                        const size = Math.ceil(controls.streak.length * points.length);
                        return new Line(
                            new BufferGeometry().setAttribute('color', new BufferAttribute(
                                new Float32Array(
                                    Array.from(Array(size).keys())
                                         .flatMap(n => [r - (r / size * n), g - (g / size * n), b - (b / size * n)])),
                                3,
                                true)),
                            new LineBasicMaterial({ vertexColors: true }),
                        )
                    })() : new Line(
                            new BufferGeometry().setFromPoints(points),
                            new LineBasicMaterial({ color: body.texture.color }),
                        );
                    return { body, algorithmProps, points, mesh, line };
                },
            ));
    nodes.forEach((node: PhysicalBodyNode) => scene.add(node.mesh, node.line));
    updateListeners.forEach((listener) => listener());
}

function tickNode(node: PhysicalBodyNode, timeYears: number) {
    const pos: Vector3 = getPos(node, timeYears);
    node.mesh.position.copy(pos);
    if (controls.streak.length < 1) {
        const points: Vector3[] = [];
        let pointer: number = 0;
        let min: { distance: number, pointer: number } = undefined;
        for (let point of node.points) {
            const distance: number = point.distanceTo(pos);
            if (!min || distance < min.distance) min = { pointer, distance };
            pointer++;
        }
        pointer = min.pointer + 1;
        const absoluteLength: number = Math.ceil(node.points.length * controls.streak.length) - 1;
        let i: number = 0;
        while (points.length <= absoluteLength) {
            const newPointer: number = pointer - 1;
            pointer = newPointer < 0 ? node.points.length - 1 : newPointer;
            points.push(node.points[pointer]);
            i++;
        }
        node.line.geometry.setFromPoints(points);
    }
}


let tickListeners: (() => void)[] = [];
export const tickSubscribe = (listener: () => void) => {
    tickListeners.push(listener);
    return () => { tickListeners = tickListeners.filter(v => v !== listener) };
}

export function tickAll(timeYears: number) {
    nodes.forEach(node => tickNode(node, timeYears));
    tickListeners.forEach((listener) => listener());
}
