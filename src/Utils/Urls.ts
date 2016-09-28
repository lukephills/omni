export function UpdateURL(url: string, title: string = '') {
	window.history.pushState({html: "Reset"}, title, url);
}
