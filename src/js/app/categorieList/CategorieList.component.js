import Component from '../component/Component';
import { weightType } from '../state/app.data';

class CategorieList extends Component {
  _parentElement = '';

  _generateMarkup() {
    const { category, elements } = this._data;
    const categoryHeading = `<h3 class="category-title">${category}</h3>`;
    const categoryElements = elements.map((element) => {
      const { productID, productNumber, productWeightType, productName } = element;
      return `
        <li class="list-group-item" data-id=${productID}>
          <div class="row">
            <div class="col-4 col-sm-6">
              ${productName}
            </div>
            <div class="col-1 col-sm-2 text-sm-end">
              ${productNumber}
            </div>
            <div class="col-1">
              ${productWeightType === weightType.kilo ? 'kg' : 'pc'}
            </div>
            <div class="col-5 col-sm-3 d-flex justify-content-end">
              <button type="button" data-action="edit" class="btn btn-outline-secondary btn-floating btn-sm">
                <span class="fas fa-pen" title="edit"></span>
              </button>
              <button type="button" data-action="delete" class="btn btn-outline-secondary btn-floating btn-sm ms-2">
                <span class="fas fa-trash" title="delete"></span>
              </button>
          </div>
          </div>
        </li>`;
    });
    return `
      <div class="mb-3">
        ${categoryHeading}
        <ul class="list-group">
          ${categoryElements.join('')}
      </ul>
      </div>
    `;
  }
}

export default new CategorieList();
