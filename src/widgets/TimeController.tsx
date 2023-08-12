import { getMs, getYears, loopState } from '../renderer/loop';
import * as React from 'react';
import { useSyncExternalStore } from 'react';
import { tickSubscribe } from '../renderer';

export default () => {
    const pointerCache: number = useSyncExternalStore(tickSubscribe, () => loopState.pointer);
    return <input id="time-control" type="datetime-local" value={new Date(getMs(pointerCache)).toISOString().slice(0, 16)} onChange={(e) => {
        loopState.pointer = getYears(e.target.valueAsNumber);
    }}/>;
}
