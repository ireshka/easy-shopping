import form from './form/Form.component';
import productList from './productList/ProductList.component';
import select from './select/Select.component';
import AppStateManager from './state/state';

const controlSelectOptions = () => {
  select.render(null, true, true);
};

const controlAddProduct = (formValues) => {
  console.log('You send form');
  const validateErrors = form.validateForm(formValues);
  if (validateErrors.length) {
    return form.renderError(validateErrors);
  }
  form.clearForm();

  console.log('No errors in form - start making list');
  AppStateManager.addProduct(formValues);
  return true;
};

const controlFillForm = () => {
  if (form.errorDisplayed) {
    form.clearError();
  }
};

const controlProductList = () => {
  const { state } = AppStateManager;
  productList.render({ products: state });
};

const controlUpdateProductList = () => {
  console.log('Register state update');
  const { state } = AppStateManager;
  productList.render({ products: state });
};

const controlInteractProduct = ({ action, id }) => {
  if (action === 'delete') {
    AppStateManager.deleteProduct(id);
  } else if (action === 'edit') {
    AppStateManager.editProduct(id);
  }
};

const controlCheckProduct = ({ id }) => {
  console.log('Product check');
  AppStateManager.checkProduct(id);
};

class App {
  init() {
    this._initState();
    this._initComponents();
  }

  _initComponents() {
    select.addHandlerRender(controlSelectOptions);
    form.addHandlerAddProduct(controlAddProduct);
    form.addHandlerFillForm(controlFillForm);
    productList.addHandlerRender(controlProductList);
    productList.addHandlerUpdate(controlUpdateProductList);
    productList.addHandlerInteractProduct(controlInteractProduct);
    productList.addHandlerCheckProduct(controlCheckProduct);
  }

  _initState() {
    AppStateManager.init();
  }
}

export default new App();
