import Component from '../component/Component';
import { categoriesNames } from '../state/app.data';

class Select extends Component {
  _parentElement = document.querySelector('#productCategory');

  _errorMessage = 'No product categories';

  addHandlerRender(handler) {
    window.addEventListener('DOMContentLoaded', handler);
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

export default new Select();
