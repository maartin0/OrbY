import * as React from 'react';

type Props = {
    name: string,
    children: JSX.Element,
    onClick?: () => void,
    onChange?: (value: boolean) => void,
    checkbox?: boolean,
    initialValue?: boolean,
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
        return (
            <div className={`icon button${this.state.checked ? ' checked' : ''}${this.props.checkbox ? ' checkbox' : ''}`} onClick={(): void => {
                if (this.props.checkbox) {
                    this.setState((prevState: State): State => {
                        const checked: boolean = !prevState.checked;
                        if (this.props.onChange) this.props.onChange(checked);
                        return { checked };
                    });
                } else if (this.props.onClick) this.props.onClick();
                }}>
                <div className='label'>
                    <span>{this.props.name}</span>
                </div>
                <div className='holder'>
                    {this.props.children}
                </div>
            </div>
        );
    }

}
