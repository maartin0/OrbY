import * as React from 'react';
import { FormEvent } from 'react';
import AnimationState, { AnimationDirection, animationState, listeners, subscribe } from '../animationState';
import { getSpeedString, programStart } from '../util/date';

let component: Controller;

type Props = {};
type State = {
    expanded: boolean,
    insane: boolean,
    animationState: AnimationState,
}

function setFromScale(value: number): void {
    animationState.animation.speedRatio = BigInt(Math.round(Math.exp(value)));
}

function getFromLogarithmic(): number {
    return Math.round(Math.log(Number(animationState.animation.speedRatio)));
}

export default class Controller extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expanded: false,
            insane: false,
            animationState,
        }
        component = this;
    }
    render(): JSX.Element {
        return (
            <div className='controller'>
                <p>{this.state.animationState.time.label}</p>
                <label>
                    Speed:
                    <input type='range' onChange={(e: FormEvent<HTMLInputElement>): void => {
                        setFromScale((e.target as HTMLInputElement).valueAsNumber);
                    }} value={getFromLogarithmic()} min={0} max={this.state.insane ? 100 : 20} step={1} />
                    ({getSpeedString(animationState.animation.speedRatio)})
                </label>
                <br />
                <label>
                    Reverse?
                    <input type='checkbox' onChange={(e: FormEvent<HTMLInputElement>): void => {
                        animationState.animation.direction = (e.target as HTMLInputElement).checked
                                                             ? AnimationDirection.backward
                                                             : AnimationDirection.forward;
                    }} />
                </label>
                <br />
                <label>
                    Pause?
                    <input type='checkbox' onChange={(e: FormEvent<HTMLInputElement>): void => {
                        animationState.animation.paused = (e.target as HTMLInputElement).checked;
                    }} />
                </label>
                <br />
                <label>
                    <input type='button' value='Enable Insanity' onClick={(e: FormEvent<HTMLInputElement>): void => {
                        this.setState({ insane: true });
                        (e.target as HTMLInputElement).disabled = true;
                    }} />
                </label>
            </div>
        );
    }
}

subscribe((animationState: AnimationState) => {
    component?.setState({ animationState });
});
