import * as React from 'react';
import { useEffect, useState } from 'react';
import Controller from '../widgets/Controller';
import { updateSize } from '../renderer/controller';

export default () => {
    const [expanded, setExpanded] = useState<boolean>(false);
    useEffect(updateSize, [expanded])
    return (
        <>
            <div className="expander" onClick={() => setExpanded((prevState: boolean) => !prevState)}>
                <span>{expanded ? 'ᐳ Hide controls' : 'ᐸ Show controls'}</span>
            </div>
            <Controller show={expanded}/>
        </>
    );
};
