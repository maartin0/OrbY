import * as React from 'react';
import AnimationState, { AnimationDirection, animationState, subscribe } from '../animationState';
import { getSpeedString } from '../util/date';
import Body from '../renderer/Body';
import { camera, setQuality } from '../renderer';
import IconButton from './IconButton';
import InIcon from '../assets/icons/in.svg';
import MinusIcon from '../assets/icons/minus.svg';
import OrbitIcon from '../assets/icons/orbit.svg';
import OutIcon from '../assets/icons/out.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlusIcon from '../assets/icons/plus.svg';
import ReverseIcon from '../assets/icons/reverse.svg';
import { Component } from 'react';

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

export default class Controller extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <div>
                <label>
                    Speed: {getSpeedString(animationState.animation.speedRatio)}
                    <input type='range' onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                        setFromScale((e.target as HTMLInputElement).valueAsNumber);
                        this.forceUpdate();
                    }} value={getFromLogarithmic()} min={0} max={20} step={1} />

                </label>

                <IconButton name='Show Orbits' onChange={(value: boolean): void => {
                    animationState.animation.orbits = value;
                }} checkbox={true} initialValue={true}><OrbitIcon /></IconButton>

                <div>
                    <IconButton name='Move In' onClick={(): void => {
                        moveFocus(-1);
                    }}><InIcon /></IconButton>

                    <IconButton name='Move Out' onClick={(): void => {
                        moveFocus(1);
                    }}><OutIcon /></IconButton>
                </div>

                <div>
                    <IconButton name='Pause' onChange={(value: boolean): void => {
                        animationState.animation.paused = value;
                    }} checkbox={true} initialValue={false}><PauseIcon /></IconButton>

                    <IconButton name='Reverse' onChange={(value: boolean): void => {
                        animationState.animation.direction = value ? AnimationDirection.backward : AnimationDirection.forward;
                    }} checkbox={true} initialValue={false}><ReverseIcon /></IconButton>
                </div>

                <div>
                    <IconButton name='Zoom In' onClick={(): void => {
                        camera.position.multiplyScalar(0.9);
                    }}><PlusIcon /></IconButton>

                    <IconButton name='Zoom Out' onClick={(): void => {
                        camera.position.multiplyScalar(1.1);
                    }}><MinusIcon /></IconButton>
                </div>

                {
                    // <IconButton name='Quality' toggle={['Normal', 'Low', 'High']} onToggle={(value: string): void => {
                    //     setQuality(value.toLowerCase() as 'high' | 'normal' | 'low');
                    // }} />
                }
            </div>
        );
    }
}
