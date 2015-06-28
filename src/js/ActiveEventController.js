import {OrderedMap, Map, List} from 'immutable';
import _ from 'lodash';

/**
 * Should replace document.addEventListener, document.removeEventListener
 * 
 * addEventListener
 * removeEventListener
 *
 * Something to think about, if there is dialog A and B
 * and dialog A implements click and keydown but dialog B only implements click
 * and B is shown on top of A, and the user clicks ESC, what happens?
 */

const uniqueId = _.uniqueId.bind(null, 'active_event_');

if (typeof document != 'undefined') {
	document.addEventListener('click', onEvent.bind(null, 'click'), true);
	document.addEventListener('keydown', onEvent.bind(null, 'keydown'));
	document.addEventListener('keyup', onEvent.bind(null, 'keyup'));
}

let listenables = OrderedMap();

/* listenable Map <type: String, Function> */

function onEvent(type, event) {
	const listenable = listenables.last();
	if (listenable) {
		let handler = listenable.get(type);
		if (typeof handler == 'function') {
			handler(event);
		}
	}
}

const EventStack = {
	addListenable(listenArray) {
		/*
		ex: [['click', clickHandler], ['keydown', keydownHandler]]
		*/
		const id = uniqueId();
		const listenable = Map(listenArray);
		listenables = listenables.set(id, listenable);
		return id;
	},
	removeListenable(id) {
		listenables = listenables.delete(id);
	}
};

export default EventStack;