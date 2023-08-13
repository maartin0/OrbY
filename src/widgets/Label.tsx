import * as React from 'react';

export type LabelProps = {
    id: string,
    show: boolean,
    color: string,
    top: number,
    left: number,
    label: string,
}

export default ({ show, color, top, left, label }: LabelProps) => {
    return show && (
        <div className="label"
             style={{ top, left }}>
            <span style={{ color }}>{label}</span>
        </div>
    );
}
