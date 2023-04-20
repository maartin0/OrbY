import * as React from 'react';
import { AnimationDirection, animationState } from '../animationState';
import { getSpeedString } from '../util/date';
import Body from '../renderer/Body';
import { camera } from '../renderer';
import IconButton from './IconButton';
import MinusIcon from '../assets/icons/minus.svg';
import OrbitIcon from '../assets/icons/orbit.svg';
import PauseIcon from '../assets/icons/pause.svg';
import PlusIcon from '../assets/icons/plus.svg';
import ReverseIcon from '../assets/icons/reverse.svg';
import ArrowIcon from '../assets/icons/arrow.svg';

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
        // @ts-ignore
      return (
            <div id='controller'>
                <IconButton name='Show Orbits' onChange={(value: boolean): void => {
                    animationState.animation.orbits = value;
                }} checkbox={true} initialValue={true}><OrbitIcon /></IconButton>

                <IconButton name='Move Out' onClick={(): void => {
                    moveFocus(1);
                }}><ArrowIcon className='r180' /></IconButton>

                <IconButton name='Move In' onClick={(): void => {
                  moveFocus(-1);
                }}><ArrowIcon /></IconButton>

                <IconButton name='Pause' onChange={(value: boolean): void => {
                    animationState.animation.paused = value;
                }} checkbox={true} initialValue={false}><PauseIcon /></IconButton>

                <IconButton name='Reverse' onChange={(value: boolean): void => {
                    animationState.animation.direction = value ? AnimationDirection.backward : AnimationDirection.forward;
                }} checkbox={true} initialValue={false}><ReverseIcon /></IconButton>

                <IconButton name='Zoom In' onClick={(): void => {
                    camera.position.multiplyScalar(0.9);
                }}><PlusIcon /></IconButton>

                <IconButton name='Zoom Out' onClick={(): void => {
                    camera.position.multiplyScalar(1.1);
                }}><MinusIcon /></IconButton>

                <label className='icon button'>
                  <div className='holder'>
                    <input type='range'
                           orient='vertical'
                           min={0}
                           max={20}
                           step={1}
                           id='speed_slider'
                           className='clickable'
                           onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                      setFromScale((e.target as HTMLInputElement).valueAsNumber);
                      this.forceUpdate();
                    }} value={getFromLogarithmic()} />
                    { /* TODO add icon */ }
                  </div>
                  <div className='label'>
                    <span>Speed: {getSpeedString(animationState.animation.speedRatio)}</span>
                  </div>
                </label>
            </div>
        );
    }
}
