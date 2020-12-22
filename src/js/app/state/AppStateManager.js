import { categoriesNames, appName } from './app.constants';

const generateInitialState = () => {
  const state = [];
  return state;
};

const initialState = generateInitialState(categoriesNames);

const stateUpdated = new Event('stateUpdate');

class AppStateManager {
  _state;

  init() {
    const isLocalStorage = this._checkLocalStorage();
    if (isLocalStorage) {
      const data = this._getLocalStorage();
      this._state = data;
      return;
    }
    this.setState(initialState);
    return;
  }

  get state() {
    if (!this._state) {
      console.error('Cannot get state before initiate it');
    }
    return this._state;
  }

  _checkLocalStorage() {
    const isKey = localStorage.getItem(appName);
    return !!isKey;
  }

  _saveLocalStorage(data) {
    const newStorageContent = JSON.stringify(data);
    localStorage.setItem(appName, newStorageContent);
  }

  _getLocalStorage() {
    const storageContent = localStorage.getItem(appName);
    const storageObject = JSON.parse(storageContent);
    return storageObject;
  }

  setState(newState) {
    this._state = newState;
    this._saveLocalStorage(newState);
    dispatchEvent(stateUpdated);
  }

  _generateProductId() {
    if (this.state.length === 0) return 1;
    const { productID } = this._state[this._state.length - 1];
    return productID + 1;
  }

  _createProductObject(dataObject, update = false) {
    const productObject = {};
    dataObject.forEach(({ fieldName, fieldValue }) => {
      productObject[fieldName] = fieldValue;
    });
    if (update) return productObject;
    const productID = this._generateProductId();
    const productChecked = false;

    return {
      ...productObject,
      productID,
      productChecked,
    };
  }

  addProduct(product) {
    const productObject = this._createProductObject(product);
    const newState = [...this.state, productObject];
    this.setState(newState);
  }

  deleteProduct(id) {
    const newState = this.state.filter(({ productID }) => productID !== Number.parseInt(id, 10));
    this.setState(newState);
  }

  editProduct(newFormData, id) {
    const newDataObject = this._createProductObject(newFormData, true);
    const newState = this.state.map((product) => {
      const { productID } = product;
      if (productID === Number.parseInt(id, 10)) {
        const newProductObject = { ...product, ...newDataObject };
        return newProductObject;
      }
      return product;
    });
    this.setState(newState);
  }

  checkProduct(id) {
    const newState = this.state.map((product) => {
      const { productID } = product;
      if (productID === Number.parseInt(id, 10)) {
        const { productChecked } = product;
        const newProductObject = { ...product, productChecked: !productChecked };
        return newProductObject;
      }
      return product;
    });
    this.setState(newState);
  }

  getProduct(id) {
    const [product] = this.state.filter(({ productID }) => productID === Number.parseInt(id, 10));
    return product;
  }
}

export default new AppStateManager();
