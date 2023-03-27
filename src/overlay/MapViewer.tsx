import * as React from 'react';
import AnimationState, { animationState, subscribe } from '../animationState';
import Body from '../renderer/body';
import * as crypto from 'crypto';
import { generateUUID } from 'three/src/math/MathUtils';

let component: MapViewer;

type Props = {};
type State = {
    animationState: AnimationState,
};

export default class MapViewer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            animationState
        }
        component = this;
    }
    render(): JSX.Element {
        return (
            <p id='map'>
                {this.state.animationState.planets.map((b: Body) => (
                    <span key={generateUUID()}
                          className={`clickable${b.focused ? ' big' : ''}`}
                          onClick={() => b.focus()}>
                        {b.displayName + ' '}
                    </span>
                ))}
            </p>
        );
    }
}

subscribe((animationState: AnimationState): void => {
    component?.setState({ animationState });
});
