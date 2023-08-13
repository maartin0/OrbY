import * as React from 'react';
import { useSyncExternalStore } from 'react';
import Controller from '../widgets/Controller';
import Labeler from '../widgets/Labeler';

export default () => {
    const scrollY: number = useSyncExternalStore(
        (onStoreChange: () => void) => {
            window.addEventListener('scroll', onStoreChange);
            return () => window.removeEventListener('scroll', onStoreChange);
        },
        () => window.scrollY,
    );
    return (
        <>
            <Labeler />
            <div className="expander">
                <div>
                <span className={scrollY < 10 ? '' : 'hide'}
                      onClick={() => window.scrollTo({ top: window.innerHeight })}>ᐱ Show controls</span>
                    <span className={scrollY < 10 ? 'hide' : ''}
                          onClick={() => window.scrollTo({ top: 0 })}>ᐯ Hide controls</span>
                </div>
            </div>
            <Controller/>
        </>
    );
};
