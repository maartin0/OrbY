import * as React from 'react';
import { FormEvent } from 'react';
import AnimationState, { AnimationDirection, animationState, subscribe } from '../animationState';

let component: Controller;

type Props = {};
type State = {
    expanded: boolean;
    animationState: AnimationState;
}

function setFromScale(value: number): void {
    const result: bigint = BigInt(Math.round(Math.exp(value)));
    animationState.animation.speedRatio = result > BigInt(1) ? result : BigInt(1);
}

function getFromLogarithmic(): number {
    return Math.round(Math.log(Number(animationState.animation.speedRatio)));
}

export default class Controller extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            expanded: false,
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
                    <input type='range' onInput={(e: FormEvent<HTMLInputElement>): void => {
                        setFromScale((e.target as HTMLInputElement).valueAsNumber);
                    }} value={getFromLogarithmic()} min={0} max={200} step={1} />
                    (x{Number(animationState.animation.speedRatio)})
                </label>
                <br />
                <label>
                    Reverse?
                    <input type='checkbox' onInput={(e: FormEvent<HTMLInputElement>): void => {
                        animationState.animation.direction = (e.target as HTMLInputElement).checked
                                                             ? AnimationDirection.backward
                                                             : AnimationDirection.forward;
                    }} />
                </label>
                <br />
                <label>
                    Pause?
                    <input type='checkbox' onInput={(e: FormEvent<HTMLInputElement>): void => {
                        animationState.animation.paused = (e.target as HTMLInputElement).checked;
                    }} />
                </label>
            </div>
        );
    }
}

subscribe((animationState: AnimationState) => {
    component?.setState({ animationState });
});
