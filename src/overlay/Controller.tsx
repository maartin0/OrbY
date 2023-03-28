import * as React from 'react';
import AnimationState, { AnimationDirection, animationState, subscribe } from '../animationState';
import { getSpeedString } from '../util/date';
import Body from '../renderer/Body';
import { camera } from '../renderer';
import IconButton from './IconButton';
import InIcon from '../assets/icons/in.svg';
import MinusIcon from '../assets/icons/minus.svg';
import OrbitIcon from '../assets/icons/orbit.svg';
import OutIcon from '../assets/icons/out.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlusIcon from '../assets/icons/plus.svg';
import ReverseIcon from '../assets/icons/reverse.svg';

let component: Controller;

type Props = {};
type State = AnimationState;

function setFromScale(value: number): void {
    animationState.animation.speedRatio = BigInt(Math.round(Math.exp(value)));
}

function getFromLogarithmic(): number {
    return Math.round(Math.log(Number(animationState.animation.speedRatio)));
}

export function moveFocus(n: number): void {
    let i: number = 0;
    for (let body of Body.bodies) {
        if (body.focused) break;
        i++;
    }
    const length: number = Body.bodies.length;
    Body.bodies[((i + n) % length + length) % length].focus();
}

export default class Controller extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = animationState;
        component = this;
    }
    render(): JSX.Element {
        return (
            <div>
                <p id='timer'>{this.state.time.label}</p>

                <IconButton name='Move In' onClick={(): void => {
                    moveFocus(-1);
                }}><InIcon /></IconButton>

                <IconButton name='Move Out' onClick={(): void => {
                    moveFocus(1);
                }}><OutIcon /></IconButton>

                <IconButton name='Zoom In' onClick={(): void => {
                    camera.position.multiplyScalar(0.9);
                }}><PlusIcon /></IconButton>

                <IconButton name='Zoom Out' onClick={(): void => {
                    camera.position.multiplyScalar(1.1);
                }}><MinusIcon /></IconButton>

                <IconButton name='Pause' onChange={(value: boolean): void => {
                    animationState.animation.paused = value;
                }} checkbox={true} initialValue={false}><PauseIcon /></IconButton>

                <IconButton name='Reverse' onChange={(value: boolean): void => {
                    animationState.animation.direction = value ? AnimationDirection.backward : AnimationDirection.forward;
                }} checkbox={true} initialValue={false}><ReverseIcon /></IconButton>

                <IconButton name='Orbits' onChange={(value: boolean): void => {
                    animationState.animation.orbits = value;
                }} checkbox={true} initialValue={true}><OrbitIcon /></IconButton>

                <label>
                    Speed:
                    <input type='range' onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        setFromScale((e.target as HTMLInputElement).valueAsNumber);
                    }} value={getFromLogarithmic()} min={0} max={20} step={1} />
                    ({getSpeedString(animationState.animation.speedRatio)})
                </label>
            </div>
        );
    }
}

subscribe((animationState: AnimationState): void => {
    component?.setState(animationState);
});
