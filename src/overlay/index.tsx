import * as React from 'react';
import Controller from './Controller';
import MapViewer from './MapViewer';
import { updateSize } from '../renderer';
import Timer from './Timer';
import * as loader from '../loader';

export default class Overlay extends React.Component<{}, {}> {
    render(): JSX.Element {
        return (
            <div id='overlay'>
                <Timer />
                <MapViewer />
                <Controller />
            </div>
        );
    }
    componentDidMount(): void {
        updateSize();
        loader.remove();
    }
}
