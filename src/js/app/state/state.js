import { categoriesNames } from './app.data';

const generateInitialState = () => {
  const state = [];
  return state;
};

const initialState = generateInitialState(categoriesNames);

const stateUpdated = new Event('stateUpdate');

class AppStateManager {
  _state;

  init() {
    this._state = initialState;
  }

  get state() {
    if (!this._state) {
      console.error('Cannot get state before initiate it');
    }
    return this._state;
  }

  setState(newState) {
    this._state = newState;
    console.log('New state:');
    console.log(this._state);
    const eventFired = dispatchEvent(stateUpdated);
    console.log(`Event fired: ${eventFired}`);
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
    console.log('New product:');
    const productObject = this._createProductObject(product);
    console.log(productObject);
    const newState = [...this.state, productObject];
    this.setState(newState);
  }

  deleteProduct(id) {
    console.log(`Deleting product: ${id}`);
    const newState = this.state.filter(({ productID }) => productID !== Number.parseInt(id, 10));
    console.log('New state after deleting');
    console.log(newState);
    this.setState(newState);
  }

  editProduct(id) {
    console.log(`Editing product: ${id}`);
  }
}

export default new AppStateManager();
