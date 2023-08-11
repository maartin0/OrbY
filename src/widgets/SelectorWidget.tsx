import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Selectable } from '../types';
import InfoButton from './InfoButton';

type Props = {
    id: string,
    options: Selectable[],
    setter: (selected: Selectable[]) => void
};

export default ({ id, options, setter }: Props) => {
    const [selected, setSelected] = useState<Selectable[]>(options.filter(o => o.defaultSelected));
    useEffect(() => setter(selected), [selected]);
    const deselected = useMemo(() =>
        options.filter(
            o =>
                selected.findIndex(o1 => o1.id === o.id) === -1,
        ), [selected]);
    const getOption = useCallback((option: Selectable) =>
        <option value={option.id}>{option.label}</option>, []);
    const extras = useMemo(() => (deselected.map(getOption)), [selected]);
    return (
        <div className="selector">
            {selected.map((option: Selectable, index: number) => (
                <div className="row">
                    <label>
                        <span>{index}:</span>
                        <select key={`selector-${id}-${index}`} onChange={e => {
                            const value = options.find(o => o.id == e.target.value);
                            console.log("found selected change", value, "actual", e.target.value);
                            setSelected((prevState: Selectable[]) =>
                                prevState.map((option: Selectable, i: number) =>
                                    index === i
                                    ? value
                                    : option,
                                ),
                            );
                        }}>
                            {getOption(option)}
                            {extras}
                        </select>
                    </label>
                    <span className="del" onClick={
                        () => setSelected(
                            (prevState: Selectable[]) =>
                                prevState.filter((_, i: number) => index !== i,
                                ))}>⨯</span>
                    {option.description && <InfoButton>
                        {option.description.value && <span>{option.description.value}</span>}
                        {option.description.wikipedia &&
                            <span><a href={option.description.wikipedia}>wikipedia</a></span>}
                    </InfoButton>}
                </div>
            ))}
            {deselected[0] && <div className="row">
                    <span className="add" onClick={
                        () => setSelected(
                            (prevState: Selectable[]) =>
                                [...prevState, deselected[0]],
                        )
                    }>+</span>
            </div>}
        </div>)
};
