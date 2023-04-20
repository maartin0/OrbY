import * as React from 'react';

type Props = {
    name: string,
    children?: JSX.Element,
    onClick?: () => void,
    onChange?: (value: boolean) => void,
    checkbox?: boolean,
    initialValue?: boolean,
    hide?: boolean,
}

type State = {
    checked: boolean,
}

export default class IconButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            checked: props.checkbox && props.initialValue,
        }
    }
    render(): JSX.Element {
        console.log(this.props.hide);
        return this.props.hide ? null : (
            <div title={this.props.name} className={`icon button clickable${(this.props.checkbox && ' checkbox') || ''}${(this.state.checked && ' checked') || ''}`} onClick={(): void => {
                if (this.props.checkbox) {
                    this.setState((prevState: State) => {
                        const checked: boolean = !prevState.checked;
                        if (this.props.onChange) this.props.onChange(checked);
                        return { checked };
                    });
                } else if (this.props.onClick) this.props.onClick();
                }}>
                <div className='holder'>
                  {this.props.children}
                </div>
                <div className='label'>
                    <span>{this.props.name}</span>
                </div>
            </div>
        );
    }
}
