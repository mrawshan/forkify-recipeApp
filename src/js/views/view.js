import icons from 'url:../../img/icons.svg';

// Parent class
export default class View {
	// Private fields //
	_data;

	// Private methods //
	_clear() {
		this._parentElement.innerHTML = '';
	}

	// Public methods //
	/**
	 * Render the received object to the DOM
	 * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
	 * @param {Boolean} [render=true] If false, create markup string insted of rendering to the DOM
	 * @returns {undefined | string} A markup string is returned if render=false
	 * @this {Object} View instance
	 * @author Muhammadu Rawshan
	 * @todo Finish implementation
	 */
	render(data, render = true) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();

		if (!render) return markup;

		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup); // Adding to the DOM
	}

	update(data) {
		this._data = data;
		const newMarkup = this._generateMarkup();
		const newDOM = document.createRange().createContextualFragment(newMarkup); // Convert string to DOM object
		const newElements = Array.from(newDOM.querySelectorAll('*')); // Selecting the newDOM & conver to actual array
		const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Selecting the curElements (actual elements in DOM) & conver to actual array

		// Comparing the curElements and newElements
		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];
			// console.log(curEl, newEl.isEqualNode(curEl));

			// Update changed TEXT
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
				// console.log('💥', newEl.firstChild?.nodeValue.trim());
				curEl.textContent = newEl.textContent;
			}

			// Update changed ATTRIBUTES
			if (!newEl.isEqualNode(curEl)) Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
		});
	}

	// Loading spinner
	renderSpinner(parentEl) {
		const markup = `
            <div class="spinner">
                <svg>💥
                    <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;

		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	// Render the error
	renderError(message = this._errorMessage) {
		const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	// Render the success message
	renderMessage(message = this._message) {
		const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}
