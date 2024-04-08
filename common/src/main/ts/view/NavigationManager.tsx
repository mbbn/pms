import * as React from 'react';
import AbstractViewName from '@common/view/AbstractViewName';
import ViewContainer from "@common/view/ViewContainer";
import {
	ThemeProvider,
	CssBaseline,
	Box,
	Container,
	Grid
} from "@mui/material";
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import MenuPanel from "@common/component/MenuPanel";
import BaseView from "@common/view/BaseView";

export interface NavigationManagerProps {
	firstViewName: AbstractViewName;
	firstViewParams?: {};
}

export interface NavigationManagerState {

}

export default class NavigationManager extends React.Component<NavigationManagerProps, NavigationManagerState> {

	static instance: NavigationManager;
	// currentView: BaseView<any, any> = null;

	constructor(props: any, context: any) {
		super(props, context);
		NavigationManager.instance = this;
	}

	render(): React.ReactNode {
		const {firstViewName, firstViewParams} = this.props;
		return (
			<Router>
				<Grid container spacing={{xs: 2, md:3}}>
					<Grid item xs={0} md={3}>
						<MenuPanel sx={{display: {xs: 'none', md: 'block'}}}/>
					</Grid>
					<Grid item xs={12} md={9}>
						<ViewContainer>
							<Routes>
								{firstViewName ? <Route key={0} path="/" Component={firstViewName.component}/>: null}
								{AbstractViewName.VALUES.map((view, index) => <Route key={index+1} path={view.path} element={<ViewRenderer viewName={view}/>}/>)}
							</Routes>
						</ViewContainer>
					</Grid>
				</Grid>
			</Router>
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
	viewElement: JSX.Element;

	constructor(props: ViewRendererProps, context: any) {
		super(props, context);
		this.viewElement = <props.viewName.component ref={(cmp: any) => this.setViewInstance(cmp)} {...props}/>;
	}

	setViewInstance(viewInstance: any) {
		// NavigationManager.instance.currentView = viewInstance;
		this.setState({viewInstance: viewInstance});
	}

	render(): React.ReactNode {
		return (this.viewElement);
	}
}