import { categoriesNames, appName } from './app.data';

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
    const eventFired = dispatchEvent(stateUpdated);
    console.log(`State changed: ${eventFired}`);
  }

  _generateProductId() {
    if (this.state.length === 0) return 1;
    const { productID } = this._state[this._state.length - 1];
    return productID + 1;
  }

  _createProductObject(dataObject) {
    const productObject = {};
    dataObject.forEach(({ fieldName, fieldValue }) => {
      productObject[fieldName] = fieldValue;
    });
    const productID = this._generateProductId();

    return {
      ...productObject,
      productID,
    };
  }

  addProduct(product) {
    console.log('Adding product:');
    const productObject = this._createProductObject(product);
    const newState = [...this.state, productObject];
    this.setState(newState);
  }

  deleteProduct(id) {
    console.log(`Deleting product: ${id}`);
    const newState = this.state.filter(({ productID }) => productID !== Number.parseInt(id, 10));
    this.setState(newState);
  }

  editProduct(id) {
    console.log(`Editing product: ${id}`);
  }
}

export default new AppStateManager();
