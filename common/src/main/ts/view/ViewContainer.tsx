import * as React from 'react';
import {ReactElement} from "react";

export interface ViewContainerProps {
	children: ReactElement | ReactElement[];
}

export default class ViewContainer extends React.Component<ViewContainerProps> {

	render() {
		const {children} = this.props;
		return (
			<div>{children}</div>
		);
	}
}
