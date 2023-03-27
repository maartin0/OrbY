import * as React from 'react';
import Controller from './Controller';
import MapViewer from './MapViewer';

export default () => (
    <div>
        <MapViewer />
        <header>
            <Controller />
        </header>
    </div>
);
