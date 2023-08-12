import * as React from "react";
import { useEffect, useState } from 'react';

type Props = {
    defaultChecked: boolean,
    onChange: (checked: boolean) => void,
};

export default ({defaultChecked, onChange}: Props) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked);
    useEffect(() => onChange(checked), [checked]);
    return <input type="checkbox" checked={checked} onChange={() => setChecked((prevState: boolean) => !prevState)} />
}
