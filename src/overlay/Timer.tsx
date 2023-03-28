import * as React from 'react';
import AnimationState, { animationState, subscribe } from '../animationState';

type Props = {};
type State = AnimationState;

let component: Timer;

export default class Timer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = animationState;
        component = this;
    }
    render(): JSX.Element {
        return (
            <p id='timer'>{this.state.time.label}</p>
        )
    }
}

subscribe((animationState: AnimationState): void => {
    component?.setState(animationState);
});
