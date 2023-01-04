import View from './view.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

// Childe class
class ResultsView extends View {
	// Private fields //
	_parentElement = document.querySelector('.results');
	_errorMessage = 'No recipes found for your query! Please try again :)';
	_message = '';

	// Private methods //
	_generateMarkup() {
		return this._data.map((result) => previewView.render(result, false)).join('');
	}
}

export default new ResultsView();
