import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Selectable } from '../types';
import InfoButton from './InfoButton';

type Props = {
    options: Selectable[],
    setter: (selected: Selectable[]) => void
    tooling?: (option: Selectable, index: number) => JSX.Element,
};

export default ({ options, setter, tooling }: Props) => {
    const [selected, setSelected] = useState<Selectable[]>(options.filter(o => o.defaultSelected));
    useEffect(() => setter(selected), [selected]);
    const deselected = useMemo(() =>
        options.filter(
            o =>
                selected.findIndex(o1 => o1.id === o.id) === -1,
        ), [selected]);
    const getOption = useCallback((option: Selectable) =>
        <option key={option.id} value={option.id}>{option.label}</option>, []);
    const extras = useMemo(() => (deselected.map(getOption)), [selected]);
    return (
        <div className="selector">
            {selected.map((option: Selectable, index: number) => (
                <div className="row" key={`selector-${option.id}-${index}`}>
                    <span className="index">{index}:</span>
                    <label>
                        <select onChange={e => {
                            const value = options.find(o => o.id == e.target.value);
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
                    <div className="fill" />
                    {tooling && tooling(option, index)}
                    {option.description && <InfoButton>
                        {option.description.value && <span>{option.description.value}</span>}
                        {option.description.wikipedia &&
                            <span><a href={option.description.wikipedia}>wikipedia</a></span>}
                    </InfoButton>}
                    <span className="del" onClick={
                        () => setSelected(
                            (prevState: Selectable[]) =>
                                prevState.filter((_, i: number) => index !== i,
                                ))}>⨯</span>
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
