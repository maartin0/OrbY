import * as React from 'react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Controller from '../widgets/Controller';
import Labeler from '../widgets/Labeler';
import { scheduleUpdate } from '../renderer';

export default () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    return (
        <>
            <Labeler />
            {expanded ? <>
                <div className="expander expanded" onClick={() => {
                    scheduleUpdate();
                    setExpanded(false);
                }}>
                    <span>Save</span>
                </div>
                <Controller />
            </> : <div className="expander" onClick={() => setExpanded(true)}>
                <span>Show controls</span>
            </div>}
        </>
    );
};
