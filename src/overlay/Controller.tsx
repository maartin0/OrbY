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

type State = {
    expansion: number; // 0 default, 1 shows minimal controls, 2 shows full data & algorithm selection panel
}

export default class Controller extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            expansion: 0,
        };
    }

    render(): JSX.Element {
        let hideLevel1: boolean = this.state.expansion == 0;
        return (
            <div id="controller">
                <IconButton name="Show Orbits" onChange={(value: boolean): void => {
                    animationState.animation.orbits = value;
                }} hide={hideLevel1} checkbox={true} initialValue={true}><OrbitIcon/></IconButton>

                <IconButton name="Move Out" onClick={(): void => {
                    moveFocus(1);
                }} hide={hideLevel1}><ArrowIcon className="r180"/></IconButton>

                <IconButton name="Move In" onClick={(): void => {
                    moveFocus(-1);
                }} hide={hideLevel1}><ArrowIcon/></IconButton>

                <IconButton name="Pause" onChange={(value: boolean): void => {
                    animationState.animation.paused = value;
                }} hide={hideLevel1} checkbox={true} initialValue={false}><PauseIcon/></IconButton>

                <IconButton name="Reverse" onChange={(value: boolean): void => {
                    animationState.animation.direction = value ? AnimationDirection.backward : AnimationDirection.forward;
                }} hide={hideLevel1} checkbox={true} initialValue={false}><ReverseIcon/></IconButton>

                <IconButton name="Zoom In" onClick={(): void => {
                    camera.position.multiplyScalar(0.9);
                }} hide={hideLevel1}><PlusIcon/></IconButton>

                <IconButton name="Zoom Out" onClick={(): void => {
                    camera.position.multiplyScalar(1.1);
                }} hide={hideLevel1}><MinusIcon/></IconButton>

                <IconButton name={`Speed: ${getSpeedString(animationState.animation.speedRatio)}`} hide={hideLevel1}>
                    <input type="range"
                           min={0}
                           max={20}
                           step={1}
                           className="clickable"
                           onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                               setFromScale((e.target as HTMLInputElement).valueAsNumber);
                               this.forceUpdate();
                           }} value={getFromLogarithmic()}/>
                    { /* TODO add icon */}
                </IconButton>

                <IconButton name="Shrink Controls" onClick={(): void => {
                    this.setState((prevState: State) => ({
                        expansion: prevState.expansion - 1,
                    }));
                }} hide={hideLevel1}><ArrowIcon className="r90"/></IconButton>

                <IconButton name="Expand Controls" onClick={(): void => {
                    this.setState((prevState: State) => ({
                        expansion: prevState.expansion + 1,
                    }));
                }} hide={this.state.expansion >= 2}><ArrowIcon className="r270"/></IconButton>

                <div id='selector' className={(this.state.expansion >= 2 && 'active') ?? ''}>

                </div>
            </div>
        );
    }
}
