import * as React from 'react';
import { useSyncExternalStore } from 'react';
import { tickSubscribe } from '../renderer';
import { loopState } from '../renderer/loop';

export default () => {
    const fps: number = useSyncExternalStore(tickSubscribe, () => loopState.fps);
    return <span>{Math.floor(fps)} fps</span>;
}
