import App from './App.svelte'

import activity from './activity.js'

// localStorage
Storage.prototype.setStuff = function (key, value) {
	this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getStuff = function (key) {
	var value = this.getItem(key)
	return value && JSON.parse(value)
}

if (!localStorage.getStuff('notDoneActivity')) {
	localStorage.setStuff('notDoneActivity', activity)
	localStorage.setStuff('missionAccomplished', [])
}

const app = new App({
	target: document.body,
});

export default app;