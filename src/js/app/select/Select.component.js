import Component from '../component/Component';
import { categoriesNames } from '../state/app.constants';

class Select extends Component {
  constructor(idName) {
    super();
    this._parentElement = document.querySelector(`#${idName}`);
  }

  _errorMessage = 'No product categories';

  addHandlerRender(handler) {
    window.addEventListener('DOMContentLoaded', handler(this));
  }

  _generateMarkup() {
    const defaultOption = '<option selected>Choose category</option>';
    const categoriesMarkup = categoriesNames.map(
      (cName) => `
      <option value="${cName}">
        ${cName}
      </option>
    `
    );
    return `${defaultOption}${categoriesMarkup.join('')}`;
  }
}

export default Select;
