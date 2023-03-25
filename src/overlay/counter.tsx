import * as React from 'react';
import { listeners } from '../renderer';
import {Component} from "react";

type props = {};
type state = {
    iteration: number,
    sec: number,
}

let component: Component | undefined;

export default class Counter extends Component<props, state> {
    constructor(props: props) {
        super(props);
        component = this;
        this.state = {
            iteration: 0,
            sec: 0,
        }
    }
    render(): JSX.Element {
        return (
            <div className='counter'>
                <p>Iteration number: {this.state.iteration}</p>
                <p>Time since start: {this.state.sec}</p>
            </div>
        );
    }
}

listeners.push((_iteration: number, _sec: number): void => {
    if (component) {
        component.setState({
            iteration: _iteration,
            sec: _sec,
        });
    }
});
