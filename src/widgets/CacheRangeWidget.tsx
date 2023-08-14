import * as React from 'react';
import { useState } from 'react';

type Props = {
    initialSize: number,
    min: number,
    max: number,
    step: number,
    label?: string,
    format: (value: number) => string,
    updater: (value: number) => void,
    prefix?: React.ReactElement | null,
    suffix?: React.ReactElement | null,
};

export default ({ initialSize, min, max, step, label, format, updater, prefix, suffix }: Props) => {
    const [cache, setCache] = useState<number>(initialSize);
    return (
        <>
            <div className="inline">
                <label>
                    {label && <span>{label}</span>}
                    {prefix}
                    <input type="range" min={min} max={max} step={step} value={cache} onChange={(e) => {
                        setCache(e.target.valueAsNumber);
                        updater(e.target.valueAsNumber);
                    }}/>
                    {suffix}
                </label>
            </div>
            <div className="inline">
                <span>{format(cache)}</span>
            </div>
        </>
    )
}
