import { Form } from '../form/Form.component';
import { formFieldNames } from '../state/app.constants';

class FormEditProduct extends Form {
  _parentElement = document.querySelector('#editProductForm');

  _formModal = document.querySelector('#editProductModal');

  _btnCloseModal = this._formModal.querySelector('.btn-close');

  _inputName = this._parentElement.querySelector(`[name="${formFieldNames.pName}"]`);

  _inputNumber = this._parentElement.querySelector(`[name="${formFieldNames.pNumber}"]`);

  _inputWeightType = this._parentElement.querySelector(`[name="${formFieldNames.pWeightType}"]`);

  _selectCategory = this._parentElement.querySelector(`[name="${formFieldNames.pCategory}"]`);

  _errorBox = this._parentElement.querySelector('#editFormErrorBox');

  _errorMessage = 'Error during editing product';

  addEditedProductId(id) {
    this._editedProductID = id;
  }

  get editedProductID() {
    return this._editedProductID;
  }

  fillForm(product) {
    const { productName, productNumber, productWeightType, productCategory } = product;

    this._inputName.value = productName;
    this._inputNumber.value = productNumber;
    this._inputWeightType.value = productWeightType;
    this._selectCategory.value = productCategory;
  }

  closeForm() {
    this._btnCloseModal.click();
  }
}

export default new FormEditProduct();
