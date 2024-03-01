import * as React from 'react';
import AbstractViewName from '@common/view/AbstractViewName';
import BaseView from '@common/view/BaseView';
import ViewContainer from "@common/view/ViewContainer";
import {Route, Routes} from "react-router-dom";

export interface NavigationManagerProps {
	firstViewName: AbstractViewName;
	firstViewParams?: {};
}

export default class NavigationManager extends React.Component<NavigationManagerProps> {

	static instance;
	currentView: BaseView<any, any>;

	constructor(props: any, context: any) {
		super(props, context);
		NavigationManager.instance = this;
	}

	render(): React.ReactNode {
		const {firstViewName, firstViewParams} = this.props;
		return (
			<ViewContainer>
				<Routes>
					{firstViewName ? <Route key={0} path="/" Component={firstViewName.component}/>: null}
					{AbstractViewName.VALUES.map((view, index) => <Route key={index+1} path={view.path} element={<ViewRenderer viewName={view}/>}/>)}
				</Routes>
			</ViewContainer>
		);
	}
}

export interface ViewRendererProps {
	viewName: AbstractViewName;
}

class ViewRenderer extends React.Component<ViewRendererProps> {

	state = {
		viewInstance: null
	};
	viewElement: any;

	constructor(props: ViewRendererProps, context: any) {
		super(props, context);
		this.viewElement = <props.viewName.component ref={comp => this.setViewInstance(comp)} {...props}/>;
	}

	setViewInstance(viewInstance: any) {
		NavigationManager.instance.currentView = viewInstance;
		this.setState({viewInstance: viewInstance});
	}

	render(): React.ReactNode {
		return (this.viewElement);
	}
}