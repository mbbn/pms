export default class CookieHandler {

	static readonly ONE_DAY_MILISECONDS = 24 * 60 * 60 * 1000;
	static setCookie(name: string, value: string, days?: number, path?: string): void {
		let expires = '';
		if (days) {
			let date = new Date();
			date.setTime(date.getTime() + (days * this.ONE_DAY_MILISECONDS));
			expires = '; expires=' + date.toUTCString();
		}
		document.cookie = name + '=' + (value || '') + expires + (path ? '; path=' + path : '');
	}

	static getCookie(name: string): string {
		let nameEq = name + '=';
		let cookiesArray = document.cookie.split(';');
		for (let i = 0; i < cookiesArray.length; i++) {
			let cookie = cookiesArray[i];
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(nameEq) === 0) {
				return cookie.substring(nameEq.length, cookie.length);
			}
		}
		return undefined;
	}

	static removeCookie(name: string): void {
		document.cookie = name + '=; Max-Age=-99999999;';
	}

	static isCookieEnabled(): boolean {
		return navigator.cookieEnabled;
	}
}
