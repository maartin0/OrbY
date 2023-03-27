import * as React from 'react';
import AnimationState, { animationState, subscribe } from '../animationState';

let component: Controller;

type Props = {};
type State = {
    expanded: boolean;
    animationState: AnimationState;
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
            </div>
        );
    }
}

subscribe((animationState: AnimationState) => {
    component.setState({ animationState });
});
