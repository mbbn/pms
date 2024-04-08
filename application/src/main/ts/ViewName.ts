import AbstractViewName from '@common//view/AbstractViewName';
import AboutUsView from "@common/view/AboutUsView";
import SettingsView from "@common/view/SettingsView";

export default class ViewName extends AbstractViewName {

	static readonly ABOUT_US = new ViewName(AboutUsView, '');
	static readonly SETTINGS = new ViewName(SettingsView, '/settings');

	private constructor(component: any, path: string) {
		super(component, path);
	}
}
