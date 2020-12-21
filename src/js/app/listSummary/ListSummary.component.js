/* eslint-disable indent */
import Component from '../component/Component';
import { weightType } from '../state/app.data';

class ListSummary extends Component {
  _getListSummary() {
    const { products } = this._data;
    const productsTotal = products.length;
    const productsTotalItems = products.reduce((acc, { productWeightType, productNumber }) => {
      if (productWeightType === weightType.quantity) {
        return (acc += Number.parseFloat(productNumber));
      }
      return acc;
    }, 0);
    const productsTotalWeight = products.reduce((acc, { productWeightType, productNumber }) => {
      if (productWeightType === weightType.kilo) {
        return (acc += Number.parseFloat(productNumber));
      }
      return acc;
    }, 0);
    console.log(productsTotal);
    console.log(productsTotalItems);
    return {
      productsTotal,
      productsTotalItems,
      productsTotalWeight,
    };
  }

  _generateMarkup() {
    const { productsTotal, productsTotalItems, productsTotalWeight } = this._getListSummary();
    console.log(productsTotal);
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
