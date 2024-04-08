import AbstractViewName from '@common//view/AbstractViewName';
import AboutUsView from "@common/view/AboutUsView";

export default class ViewName extends AbstractViewName {

	static readonly ABOUT_US = new ViewName(AboutUsView, '');

	private constructor(component: any, path: string) {
		super(component, path);
	}
}
