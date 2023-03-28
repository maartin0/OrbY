import * as React from 'react';
import AnimationState, { animationState, subscribe } from '../animationState';
import Body from '../renderer/Body';
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
                {Body.bodies.map((b: Body) => {
                    const projection: Vector2 | null = b.getProjection();

                    return projection ? (
                    <span key={b.displayName}
                          className={`label${b.focused ? ' focused' : ''}`}
                          onClick={() => b.focus()}
                          style={{
                              left: projection.x + 'px',
                              top: projection.y + 'px',
                          }}>
                        {b.displayName + ' '}
                    </span>
                    ) : <span key={b.displayName} />;
                })}
            </div>
        );
    }
}

subscribe((animationState: AnimationState): void => {
    component?.setState({ animationState });
});
