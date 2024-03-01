import AbstractViewName from '@common//view/AbstractViewName';
import AboutUsView from "@common/view/AboutUsView";
/* PROTECTED REGION ID(PgwViewNameImports) ENABLED START */
/* PROTECTED REGION END */

export default class ViewName extends AbstractViewName {

	static readonly ABOUT_US = new ViewName(AboutUsView, '');

	private constructor(component: any, path: string) {
		super(component, path);
	}
}
