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
    prefix?: JSX.Element,
    suffix?: JSX.Element,
};
type Cache = { size: number, set: boolean };

export default ({ initialSize, min, max, step, label, format, updater, prefix, suffix }: Props) => {
    const [cache, setCache] = useState<Cache>({
        size: initialSize,
        set: true,
    });
    return (
        <>
            <div className="inline">
                <label>
                    {label && <span>{label}</span>}
                    {prefix}
                    <input type="range" min={min} max={max} step={step} defaultValue={initialSize} onChange={(e) => {
                        setCache({ size: e.target.valueAsNumber, set: false });
                    }}/>
                    {suffix}
                </label>
            </div>
            {!cache.set && <div className="inline">
                <span>{format(cache.size)}</span>
                <input type="button" value="Save" onClick={() => {
                    updater(cache.size);
                    setCache({ size: initialSize, set: true });
                }}/>
            </div>}
        </>
    )
}
