import Component from '../component/Component';
import { weightType } from '../state/app.constants';
import interactButtons from '../interactButtons/interactButtons.view';

class CategoryList extends Component {
  _parentElement = '';

  _generateMarkup() {
    const { category, elements } = this._data;
    const categoryHeading = `<h3 class="category-title">${category}</h3>`;
    const categoryElements = elements.map((element) => {
      const { productID, productNumber, productWeightType, productName, productChecked } = element;
      return `
        <li class="list-group-item px-2 px-sm-3" data-id=${productID}>
          <div class="row gx-1 align-items-center">
            <div class="col-5 col-sm-6 d-flex align-items-center flex-shrink-0 list-column-name">
              <input class="form-check-input my-0 me-2" type="checkbox" aria-label="Check/Uncheck product"
              ${productChecked ? 'checked' : ''} id="check-${productID}">
              <label class="form-check-label lh-1 d-block fs-6" for="check-${productID}">
                ${productName}
              </label>
            </div>
            <div class="col-2 col-sm-2 text-end fs-7 fst-italic list-column-number">
              ${productNumber}
            </div>
            <div class="col-1 fs-7 fst-italic list-column-weight">
              ${productWeightType === weightType.kilo ? 'kg' : 'pc'}
            </div>
            <div class="col-4 col-sm-3 d-flex justify-content-end d-print-none">
              ${interactButtons}
          </div>
          </div>
        </li>`;
    });
    return `
      <div class="mb-3 block-category">
        ${categoryHeading}
        <ul class="list-group">
          ${categoryElements.join('')}
      </ul>
      </div>
    `;
  }
}

export default new CategoryList();
