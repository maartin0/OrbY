import * as React from 'react';
import Controller from './Controller';
import MapViewer from './MapViewer';
import { updateSize } from '../renderer';

export default class Overlay extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <div>
                <MapViewer/>
                <header>
                    <Controller/>
                </header>
            </div>
        );
    }
    componentDidMount(): void {
        updateSize();
    }
}
