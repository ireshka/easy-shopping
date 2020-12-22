import Component from '../component/Component';
import { weightType, formFieldNames } from '../state/app.constants';

const productNameValidator = (productName) => {
  const regexpName = /^[\p{L}\p{N} ()&.-]{3,50}$/gu;
  return regexpName.test(productName);
};

const productNumberValidator = (productNumber) => {
  if (!productNumber) return false;
  const number = Number.parseFloat(productNumber);
  if (number < 0.05 || number > 100 || Number.isNaN(number)) return false;
  return true;
};

const productWeightTypeValidator = (weight) => {
  if (!weight) return false;
  const isValidType =
    weight.toLowerCase() === weightType.quantity || weight.toLowerCase() === weightType.kilo;
  if (!isValidType) return false;
  return true;
};

const productCategoryValidator = (category) => {
  if (!category) return false;
  if (typeof category !== 'string') return false;
  if (category.toLowerCase() === 'choose category') return false;
  return true;
};

class Form extends Component {
  _parentElement = document.querySelector('#addProductForm');

  _inputName = this._parentElement.querySelector(`[name="${formFieldNames.pName}"]`);

  _inputNumber = this._parentElement.querySelector(`[name="${formFieldNames.pNumber}"]`);

  _inputWeightType = this._parentElement.querySelector(`[name="${formFieldNames.pWeightType}"]`);

  _selectCategory = this._parentElement.querySelector(`[name="${formFieldNames.pCategory}"]`);

  _errorBox = this._parentElement.querySelector('#formErrorBox');

  _errorMessage = 'Error during adding product';

  _formElements = [
    {
      fieldName: formFieldNames.pName,
      validator: productNameValidator,
      errorText:
        'Product name should have between 3 and 50 chars: letters, numbers, spaces and () - &  . are allowed.',
    },
    {
      fieldName: formFieldNames.pNumber,
      validator: productNumberValidator,
      errorText: 'Enter number between 0.05 and 100',
    },
    {
      fieldName: formFieldNames.pWeightType,
      validator: productWeightTypeValidator,
      errorText: 'Choose quantity or weight',
    },
    {
      fieldName: formFieldNames.pCategory,
      validator: productCategoryValidator,
      errorText: 'Choose category',
    },
  ];

  clearForm() {
    this._inputName.value = '';
    this._inputNumber.value = '';
    this._inputWeightType.value = weightType.quantity;
    this._selectCategory.value = 'Choose category';
  }

  validateForm(formValues) {
    // const formValues = this._getFormValues();
    const validateOutput = formValues.map(({ fieldName, fieldValue }) => {
      const formElement = this._formElements.find((el) => el.fieldName === fieldName);
      const isValid = formElement.validator(fieldValue);
      if (isValid) {
        return null;
      }
      return formElement.errorText;
    });
    const validateErrors = validateOutput.filter((el) => el !== null);
    return validateErrors;
  }

  addHandlerSendProduct(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = [...new FormData(this)];
      const formContent = formData.map((el) => {
        const [fieldName, fieldValue] = el;
        return { fieldName, fieldValue };
      });
      handler(formContent);
    });
  }

  addHandlerFillForm(handler) {
    this._parentElement.addEventListener('input', handler);
  }
}

export default new Form();
export { Form };
