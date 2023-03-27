import * as React from 'react';
import AnimationState, { animationState, subscribe } from '../animationState';
import Body from '../renderer/body';
import { generateUUID } from 'three/src/math/MathUtils';
import { Vector2 } from 'three';

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
            <div id='map'>
                {this.state.animationState.planets.map((b: Body) => {
                    const projection: Vector2 = b.getProjection();
                    return (
                    <span key={generateUUID()}
                          className={`label${b.focused ? ' focused' : ''}`}
                          onClick={() => b.focus()}
                          style={{
                              left: (100 * projection.x)+'vw',
                              top: (100 * projection.y)+'vh',
                          }}>
                        {b.displayName + ' '}
                    </span>
                )})}
            </div>
        );
    }
}

subscribe((animationState: AnimationState): void => {
    component?.setState({ animationState });
});
