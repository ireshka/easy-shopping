import categorieList from '../categorieList/CategorieList.component';
import Component from '../component/Component';
import emptyList from '../emptyList/EmptyList.component';
import listSummary from '../listSummary/ListSummary.component';
import { categoriesNames, formFieldNames } from '../state/app.data';

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
      return categorieList.render(categorieData, false);
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
      const element = event.target.closest('.list-group-item');
      const { action } = btn.dataset;
      const { id } = element.dataset;
      if (!btn) return;
      handler({ action, id });
    });
  }
}

export default new ProductList();
