export default abstract class AbstractViewName {

	static readonly VALUES: AbstractViewName[] = [];

	component: any;
	path: string;

	protected constructor(component: any, path: string) {
		this.component = component;
		this.path = path.startsWith('/') ? path : '/' + path;
		AbstractViewName.VALUES.push(this);
	}
}
