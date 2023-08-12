import * as React from 'react';
import { useMemo, useSyncExternalStore } from 'react';
import SelectorWidget from './SelectorWidget';
import bodies from '../renderer/entities/bodies';
import algorithms from '../renderer/entities/orbits';
import { AlgorithmProps, PhysicalBody, PhysicalBodyNode, Selectable } from '../types';
import { controls, nodes, SPEED_OPTIONS, update, updateSubscribe } from '../renderer';
import FpsWidget from './FpsWidget';
import TimeController from './TimeController';
import CheckboxWidget from './CheckboxWidget';

type Props = { show: boolean };

export default ({ show }: Props) => {
    const nodeCache: PhysicalBodyNode[] = useSyncExternalStore<PhysicalBodyNode[]>(updateSubscribe, () => nodes);
    const focusList: JSX.Element[] = useMemo(() => nodeCache.map((node: PhysicalBodyNode, index: number) => (
        <option key={`${node.body.id}-${index}`} value={index}
                label={index === 0 || index === (nodeCache.length - 1) ? node.body.label : undefined}/>
    )), [nodeCache]);
    return (
        <div className={`controls${show ? ' expanded' : ''}`}>
            <div>
                <h3>Body Selection:</h3>
                <SelectorWidget options={Object.values(bodies)} setter={(value: Selectable[]) => {
                    controls.selectedBodies = value as PhysicalBody[];
                    update();
                }}/>
                <h3>Algorithm Selection:</h3>
                <SelectorWidget options={Object.values(algorithms)} setter={(value: Selectable[]) => {
                    controls.selectedAlgorithms = value as AlgorithmProps[];
                    update();
                }}/>
                <h3><label htmlFor="speed-control">Speed Control:</label></h3>
                <div className="inline">
                    <span className={`del${controls.speedIndex > 0 ? '' : ' hide'}`} onClick={() => {
                        controls.speedIndex--;
                        update();
                    }}>-</span>
                    <div className="fill"/>
                    <span className="speed-label">{SPEED_OPTIONS[controls.speedIndex].label}</span>
                    <div className="fill"/>
                    <span className={`add${controls.speedIndex < (SPEED_OPTIONS.length - 1) ? '' : ' hide'}`}
                          onClick={() => {
                              controls.speedIndex++;
                              update();
                          }}>+</span>
                </div>
                <div className="inline">
                    <TimeController/>
                </div>
                <h3><label htmlFor="focus-control">Change Focus:</label></h3>
                <div className="inline">
                    <span>{nodeCache[0]?.body.label}</span>
                    <input id="focus-control" type="range" list="focus-list" defaultValue={0} step={1}
                           max={nodeCache.length - 1}
                           onChange={(e) => {
                               controls.focus = e.target.valueAsNumber;
                           }}/>
                    <span>{nodeCache[nodeCache.length - 1]?.body.label}</span>
                </div>
                <datalist id="focus-list">
                    {focusList}
                </datalist>
                <h3><label htmlFor="streak-length">Streak Length:</label></h3>
                <div className="inline">
                    <span>0%</span>
                    <input id="streak-length" type="range" min={0} max={1} step={0.1}
                           defaultValue={controls.streakLength}
                           onChange={(e) => {
                               controls.streakLength = e.target.valueAsNumber;
                               update();
                           }}/>
                    <span>100%</span>
                </div>
                <h3><label htmlFor="scale-control">Body Scale:</label></h3>
                <div className="inline">
                    <span>0.1</span>
                    <input id="scale-control" type="range" min={0.1} max={5} step={0.1}
                           defaultValue={1}
                           onChange={(e) => {
                               controls.scale.value = e.target.valueAsNumber;
                               update();
                           }} />
                    <span>5</span>
                </div>
                <div className="inline">
                    <label>
                        Smoothed?
                        <CheckboxWidget defaultChecked={false} onChange={(value: boolean) => {
                            controls.scale.real = !value;
                            update();
                        }}/>
                    </label>
                </div>
                <h3>Debug Stats:</h3> {/* TODO remove */}
                <div className="inline"><FpsWidget/></div>
            </div>
        </div>
    )
}
