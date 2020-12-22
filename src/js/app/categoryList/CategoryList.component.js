import Component from '../component/Component';
import { weightType } from '../state/app.constants';

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
            <div class="col-5 col-sm-6 d-flex align-items-center flex-shrink-0">
              <input class="form-check-input my-0 me-2" type="checkbox"
              ${productChecked ? 'checked' : ''}
              id="check-${productID}">
              <label class="form-check-label lh-1 d-block fs-6" for="check-${productID}">
                ${productName}
              </label>
            </div>
            <div class="col-2 col-sm-2 text-end fs-7 fst-italic">
              ${productNumber}
            </div>
            <div class="col-1 fs-7 fst-italic">
              ${productWeightType === weightType.kilo ? 'kg' : 'pc'}
            </div>
            <div class="col-4 col-sm-3 d-flex justify-content-end">
              <button type="button" class="btn btn-outline-secondary btn-floating btn-sm btn-control" 
              data-action="edit"
              data-mdb-toggle="modal" data-mdb-target="#editProductModal">
                <span class="fas fa-pen" title="edit"></span>
              </button>
              <button type="button" data-action="delete" class="btn btn-outline-secondary btn-floating btn-sm btn-control ms-2">
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

export default new CategoryList();
