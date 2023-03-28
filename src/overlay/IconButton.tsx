import * as React from 'react';

type Props = {
    name: string,
    children?: JSX.Element,
    onClick?: () => void,
    onChange?: (value: boolean) => void,
    onToggle?: (value: string) => void,
    checkbox?: boolean,
    initialValue?: boolean,
    toggle?: string[],
}

type State = {
    checked: boolean,
    toggleIndex: number,
}

export default class IconButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            checked: props.checkbox && props.initialValue,
            toggleIndex: 0,
        }
    }
    render(): JSX.Element {
        return (
            <div title={this.props.name} className={`icon button${this.state.checked ? ' checked' : ''}${this.props.checkbox ? ' checkbox' : ''}`} onClick={(): void => {
                if (this.props.checkbox) {
                    this.setState((prevState: State) => {
                        const checked: boolean = !prevState.checked;
                        if (this.props.onChange) this.props.onChange(checked);
                        return { checked };
                    });
                } else if (this.props.toggle) {
                    this.setState((prevState: State) => {
                        let next: number = prevState.toggleIndex += 1;
                        if (next >= this.props.toggle.length) next = 0;
                        if (this.props.onToggle) this.props.onToggle(this.props.toggle[next]);
                        return { toggleIndex: next };
                    });
                } else if (this.props.onClick) this.props.onClick();
                }}>
                <div className='label'>
                    <span>{`${this.props.name}${this.props.toggle ? `: ${this.props.toggle[this.state.toggleIndex]}` : ''}`}</span>
                </div>
                <div className='holder'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
