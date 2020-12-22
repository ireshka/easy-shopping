export default class Component {
  _data;

  _errorBox = document.querySelector('#errorBox');

  _isEmptyArray(element) {
    return Array.isArray(element) && element.length === 0;
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  clearError() {
    this._errorBox.innerHTML = '';
    this._errorBox.classList.add('d-none');
  }

  render(data, render = true, internal = false) {
    if (internal) {
      data = true;
    }

    if (!data || this._isEmptyArray(data)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this.clearError();
    return this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    this.clearError();
    let markup;
    if (Array.isArray(message) && message.length > 1) {
      const errorListElements = message.map((message) => `<li>${message}</li>`);
      markup = `<ul>${errorListElements.join('')}</ul>`;
    } else {
      markup = `<span>${message}</span>`;
    }
    this._errorBox.insertAdjacentHTML('afterbegin', markup);
    this._errorBox.classList.remove('d-none');
  }

  get errorDisplayed() {
    return !this._errorBox.classList.contains('d-none');
  }
}
