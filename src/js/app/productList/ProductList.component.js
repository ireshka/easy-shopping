import categoryList from '../categoryList/CategoryList.component';
import Component from '../component/Component';
import emptyList from '../emptyList/EmptyList.component';
import listSummary from '../listSummary/ListSummary.component';
import { categoriesNames, formFieldNames } from '../state/app.constants';

class ProductList extends Component {
  _parentElement = document.querySelector('#productList');

  _errorMessage = 'Error during display product list';

  _checkEmptyList() {
    if (this._data.products.length) return false;
    return true;
  }

  _getCategoriesWithElements() {
    const categories = [];
    const { products } = this._data;
    categoriesNames.forEach((category) => {
      const elements = products.filter((product) => product[formFieldNames.pCategory] === category);
      if (elements.length) {
        const categoryContent = {
          category,
          elements,
        };
        categories.push(categoryContent);
      }
    });
    return categories;
  }

  _generateMarkup() {
    if (this._checkEmptyList()) {
      return emptyList;
    }
    const categoriesWithElements = this._getCategoriesWithElements();

    const categoriesMarkup = categoriesWithElements.map((categorieData) => {
      return categoryList.render(categorieData, false);
    });
    const summaryMarkup = listSummary.render(this._data, false);

    return `
      ${categoriesMarkup.join('')}
      ${summaryMarkup}
    `;
  }

  addHandlerUpdate(handler) {
    window.addEventListener('stateUpdate', handler);
  }

  addHandlerRender(handler) {
    window.addEventListener('DOMContentLoaded', handler);
  }

  addHandlerInteractProduct(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('.btn');
      if (!btn) return;
      const { action } = btn.dataset;
      const element = event.target.closest('.list-group-item');
      const { id } = element.dataset;
      handler({ action, id });
    });
  }

  addHandlerCheckProduct(handler) {
    this._parentElement.addEventListener('change', (event) => {
      const checkbox = event.target.closest('[type="checkbox"]');
      if (!checkbox) return;
      const element = event.target.closest('.list-group-item');
      const { id } = element.dataset;
      handler({ id });
    });
  }
}

export default new ProductList();
