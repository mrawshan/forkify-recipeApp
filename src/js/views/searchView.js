class SearchView {
	// Private fields //
	_parentElement = document.querySelector('.search');

	// Private methods //
	_clearInput() {
		this._parentElement.querySelector('.search__field').value = '';
	}

	// Public methods //
	getQuery() {
		const query = this._parentElement.querySelector('.search__field').value;
		this._clearInput();
		return query;
	}

	addHandlerSearch(handler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			handler();
		});
	}
}

export default new SearchView();
