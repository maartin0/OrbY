import * as React from 'react';
import { FormEvent } from 'react';
import AnimationState, { AnimationDirection, animationState, subscribe } from '../animationState';
import { getSpeedString } from '../util/date';

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
            <div id='controller'>
                <div className={this.state.expanded ? '' : 'hidden'}>
                    <div>
                        <label>
                            Reverse?
                            <input type='checkbox' onChange={(e: FormEvent<HTMLInputElement>): void => {
                                animationState.animation.direction = (e.target as HTMLInputElement).checked
                                                                     ? AnimationDirection.backward
                                                                     : AnimationDirection.forward;
                            }} />
                        </label>
                        <label>
                            Pause?
                            <input type='checkbox' onChange={(e: FormEvent<HTMLInputElement>): void => {
                                animationState.animation.paused = (e.target as HTMLInputElement).checked;
                            }} />
                        </label>
                        <label>
                            <input type='button' value='Enable Insanity' onClick={(e: FormEvent<HTMLInputElement>): void => {
                                this.setState({ insane: true });
                                (e.target as HTMLInputElement).remove();
                            }} />
                        </label>
                    </div>
                    <br />
                    <label>
                        Speed:
                        <input type='range' onChange={(e: FormEvent<HTMLInputElement>): void => {
                            setFromScale((e.target as HTMLInputElement).valueAsNumber);
                        }} value={getFromLogarithmic()} min={0} max={this.state.insane ? 100 : 20} step={1} />
                        ({getSpeedString(animationState.animation.speedRatio)})
                    </label>
                </div>
                <input type='button' value={this.state.expanded ? 'Hide controls' : 'Show controls'} onClick={(): void => {
                    this.setState({ expanded: !this.state.expanded });
                }}/>
                <p id='timer'>{this.state.animationState.time.label}</p>
            </div>
        );
    }
}

subscribe((animationState: AnimationState) => {
    component?.setState({ animationState });
});
