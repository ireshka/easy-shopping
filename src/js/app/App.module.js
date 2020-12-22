import form from './form/Form.component';
import formEdit from './formEditProduct/FormEditProduct.component';
import productList from './productList/ProductList.component';
import Select from './select/Select.component';
import appStateManager from './state/AppStateManager';

const selectAddForm = new Select('productCategory');
const selectEditForm = new Select('editProductCategory');

const controlAddProduct = (formValues) => {
  const validateErrors = form.validateForm(formValues);
  if (validateErrors.length) {
    return form.renderError(validateErrors);
  }
  form.clearForm();

  appStateManager.addProduct(formValues);
  return true;
};

const controlEditProduct = (formValues) => {
  const validateErrors = form.validateForm(formValues);
  if (validateErrors.length) {
    formEdit.renderError(validateErrors);
  } else {
    formEdit.clearForm();
    const { editedProductID } = formEdit;
    appStateManager.editProduct(formValues, editedProductID);
    formEdit.closeForm();
  }
};

const controlFillForm = () => {
  if (form.errorDisplayed) {
    form.clearError();
  }
};

const controlProductList = () => {
  const { state } = appStateManager;
  productList.render({ products: state });
};

const controlUpdateProductList = () => {
  const { state } = appStateManager;
  productList.render({ products: state });
};

const controlInteractProduct = ({ action, id }) => {
  if (action === 'delete') {
    appStateManager.deleteProduct(id);
  }
  if (action === 'edit') {
    const product = appStateManager.getProduct(id);
    formEdit.fillForm(product);
    formEdit.addEditedProductId(id);
  }
};

const controlCheckProduct = ({ id }) => {
  appStateManager.checkProduct(id);
};

const controlSelect = (selectObject) => {
  selectObject.render(null, true, true);
};

class App {
  init() {
    this._initState();
    this._initComponents();
  }

  _initComponents() {
    selectAddForm.addHandlerRender(controlSelect);
    selectEditForm.addHandlerRender(controlSelect);
    form.addHandlerSendProduct(controlAddProduct);
    form.addHandlerFillForm(controlFillForm);
    productList.addHandlerRender(controlProductList);
    productList.addHandlerUpdate(controlUpdateProductList);
    productList.addHandlerInteractProduct(controlInteractProduct);
    productList.addHandlerCheckProduct(controlCheckProduct);
    formEdit.addHandlerSendProduct(controlEditProduct);
  }

  _initState() {
    appStateManager.init();
  }
}

export default new App();
