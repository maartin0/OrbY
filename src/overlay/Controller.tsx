import * as React from 'react';
import AnimationState, { AnimationDirection, animationState, subscribe } from '../animationState';
import { getSpeedString } from '../util/date';
import Body from '../renderer/body';

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
                <label>
                    Reverse?
                    <input type='checkbox' onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        animationState.animation.direction = (e.target as HTMLInputElement).checked
                                                             ? AnimationDirection.backward
                                                             : AnimationDirection.forward;
                    }} />
                </label>
                <label>
                    Pause?
                    <input type='checkbox' onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        animationState.animation.paused = (e.target as HTMLInputElement).checked;
                    }} />
                </label>
                <label>
                    Disable Orbits?
                    <input type='checkbox' onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        animationState.orbitsDisabled = (e.target as HTMLInputElement).checked;
                    }} />
                </label>
                <input type='button' value='Move in' onClick={(): void => {
                    moveFocus(-1);
                }} />
                <input type='button' value='Move out' onClick={(): void => {
                    moveFocus(1);
                }} />
                <input type='button' value='Zoom in' onClick={(): void => {
                    animationState.viewport.camera.position.multiplyScalar(0.9);
                }} />
                <input type='button' value='Zoom out' onClick={(): void => {
                    animationState.viewport.camera.position.multiplyScalar(1.1);
                }} />
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
