import * as React from "react";

type Props = React.PropsWithChildren<{}>;

export default ({children}: Props) => (
    <div className="info"><span>i</span><div>{children}</div></div>
)
