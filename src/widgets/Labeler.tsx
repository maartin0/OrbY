import * as React from 'react';
import { useSyncExternalStore } from 'react';
import Label, { LabelProps } from './Label';
import { labels, tickSubscribe } from '../renderer';

export default () => {
    const labelCache: LabelProps[] = useSyncExternalStore(tickSubscribe, () => labels);
    return <>
        {labelCache.map((label: LabelProps) => <Label key={label.id} {...label} />)}
    </>;
}
