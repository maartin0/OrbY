import * as React from 'react';
import { useMemo, useSyncExternalStore } from 'react';
import SelectorWidget from './SelectorWidget';
import bodies, { SUN } from '../renderer/entities/bodies';
import algorithms from '../renderer/entities/orbits';
import { AlgorithmProps, PhysicalBody, PhysicalBodyNode, Selectable, SpirographOption } from '../types';
import { controls, nodes, scheduleUpdate, SPEED_OPTIONS, updateSubscribe } from '../renderer';
import FpsWidget from './FpsWidget';
import TimeController from './TimeController';
import CheckboxWidget from './CheckboxWidget';
import CacheRangeWidget from './CacheRangeWidget';
import { loopState } from '../renderer/loop';

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0 });
    }
});

export default () => {
    const nodeCache: PhysicalBodyNode[] = useSyncExternalStore<PhysicalBodyNode[]>(updateSubscribe, () => nodes);
    const extendedControls: boolean = useMemo(() => nodeCache[0]?.body.id !== SUN.id, [nodeCache]);

    return (
        <div className="controls">
            <div>
                <h3>Speed Control:</h3>
                <div className="inline">
                    <span className={`del${controls.speedIndex > 0 ? '' : ' hide'}`} onClick={() => {
                        controls.speedIndex--;
                        scheduleUpdate();
                    }}>-</span>
                    <div className="fill"/>
                    <span className="speed-label">{SPEED_OPTIONS[controls.speedIndex].label}</span>
                    <div className="fill"/>
                    <span className={`add${controls.speedIndex < (SPEED_OPTIONS.length - 1) ? '' : ' hide'}`}
                          onClick={() => {
                              controls.speedIndex++;
                              scheduleUpdate();
                          }}>+</span>
                </div>
                <div className="inline">
                    <TimeController/>
                </div>
            </div>
            <div>
                <h3>Streak Length:</h3>
                <CacheRangeWidget min={nodeCache[0]?.body.id === SUN.id ? 0 : 1}
                                  max={extendedControls ? 20 : 1}
                                  step={0.1}
                                  initialSize={0.7}
                                  prefix={<span>{nodeCache[0]?.body.id === SUN.id ? '0%' : '100%'}</span>}
                                  suffix={<span>{extendedControls ? '2000%' : '100%'}</span>}
                                  format={(v: number) => `New length: ${Math.round(v * 100)}%`}
                                  updater={(v: number) => {
                                      controls.streak.length = v;
                                      scheduleUpdate();
                                  }}/>
            </div>
            <div>
                <h3>Body Scale:</h3>
                <CacheRangeWidget min={0.1}
                                  max={5}
                                  step={0.1}
                                  initialSize={1}
                                  prefix={<span>10%</span>}
                                  suffix={<span>500%</span>}
                                  format={(v: number) => `New size: ${Math.round(v * 100)}%`}
                                  updater={(v: number) => {
                                      controls.scale.value = v;
                                      scheduleUpdate();
                                  }}/>
                <div className="inline">
                    <label>
                        Visible scale?
                        <CheckboxWidget defaultChecked={false} onChange={(value: boolean) => {
                            controls.scale.real = !value;
                            scheduleUpdate();
                        }}/>
                    </label>
                </div>
            </div>
            <div>
                <h3>Body Labels:</h3>
                <div className="inline">
                    <label>
                        <span>Enabled?:</span>
                        <CheckboxWidget defaultChecked={controls.labels} onChange={(value: boolean) => {
                            controls.labels = value;
                            scheduleUpdate();
                        }}/>
                    </label>
                </div>
            </div>
            <div>
                <h3>Algorithm Selection:</h3>
                <SelectorWidget options={Object.values(algorithms)} setter={(value: Selectable[]) => {
                    controls.selectedAlgorithms = value as AlgorithmProps[];
                    scheduleUpdate();
                }}/>
            </div>
            <div>
                <h3>Body Selection:</h3>
                <SelectorWidget options={Object.values(bodies)}
                                setter={(value: Selectable[]) => {
                                    controls.selectedBodies = value as PhysicalBody[];
                                    scheduleUpdate();
                                }}
                                tooling={(value: Selectable, index: number) => index !== 0 && (
                                    <div className="focus-btn" title="Move planet to origin" onClick={() => {
                                        // Swap focused, requires 2 update cycles
                                        if ((value as PhysicalBody).id === SUN.id) controls.streak.length = 0.7;
                                        else if (controls.streak.length < 1) controls.streak.length = 1;
                                        [controls.selectedBodies[0], controls.selectedBodies[index]] =
                                            [controls.selectedBodies[index], controls.selectedBodies[0]];
                                        scheduleUpdate();
                                    }}><span>🔍</span></div>
                                )}/>
            </div>
            <div>
                <h3>Spirograph Generator:</h3>
                <SelectorWidget
                    options={nodeCache.flatMap((node: PhysicalBodyNode, index: number) => nodeCache.slice(index + 1).map((node1: PhysicalBodyNode): SpirographOption => {
                        const maxPeriod: number = Math.max(node.body.properties.elements.orbitalPeriodYears, node1.body.properties.elements.orbitalPeriodYears);
                        return ({
                            id: `${node.body.id}-${node1.body.id}`,
                            label: `${node.body.label} + ${node1.body.label}`,
                            defaultSelected: false,
                            from: node,
                            to: node1,
                            lines: [],
                            end: loopState.lastTick + 30 * maxPeriod,
                            plotInterval: maxPeriod / 120,
                            lastPlot: loopState.lastTick,
                        });
                    }))} setter={(selected: Selectable[]) => {
                    controls.spirograph.options = selected as SpirographOption[];
                    scheduleUpdate();
                }}/>
            </div>
            <div>
                <h3>Debug Stats:</h3>
                <div className="inline"><FpsWidget/></div>
            </div>
        </div>
    )
}
