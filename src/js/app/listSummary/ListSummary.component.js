/* eslint-disable indent */
import Component from '../component/Component';
import { weightType } from '../state/app.data';

class ListSummary extends Component {
  _getTotalSum(weightType) {
    const { products } = this._data;
    const productsTotalSum = products.reduce((acc, { productNumber, productWeightType }) => {
      if (productWeightType === weightType) {
        const number = Number.parseFloat(productNumber);
        return (acc += number);
      }
      return 0;
    }, 0);
    return productsTotalSum;
  }

  _getListSummary() {
    const { products } = this._data;
    const productsTotal = products.length;
    const productsTotalItems = this._getTotalSum(weightType.quantity);
    const productsTotalWeight = this._getTotalSum(weightType.kilo);
    return {
      productsTotal,
      productsTotalItems,
      productsTotalWeight,
    };
  }

  _generateMarkup() {
    const { productsTotal, productsTotalItems, productsTotalWeight } = this._getListSummary();
    const summaryMarkup = `
      <div class="row list-summary">
        <div class="col-sm-11 offset-sm-1">
          <p><h3 class="fs-5">Summary:</h3></p>
          <p>Remember about total: 
            <strong class="text-primary">${productsTotal}
            item${productsTotal > 1 ? 's' : ''}</strong>.</p>
        ${
          productsTotalItems !== 0
            ? `<p>Pieces: <strong class="text-primary">${productsTotalItems}</strong>.</p>`
            : ''
        }
        ${
          productsTotalWeight !== 0
            ? `<p>Weight: <strong class="text-primary">${productsTotalWeight} kg</strong>.</p>`
            : ''
        }
        </div>
      </div>`;
    return summaryMarkup;
  }
}

export default new ListSummary();
