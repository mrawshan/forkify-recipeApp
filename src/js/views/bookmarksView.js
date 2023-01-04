import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

// Childe class
class BookmarksView extends View {
	// Private fields //
	_parentElement = document.querySelector('.bookmarks__list');
	_errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
	_message = '';

	// Public methods //
	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}

	// Private methods //
	_generateMarkup() {
		return this._data.map((bookmark) => previewView.render(bookmark, false)).join('');
	}
}

export default new BookmarksView();
