const categoriesNames = [
  'dairy',
  'bakery',
  'beverages',
  'meat',
  'fruit',
  'vegetables',
  'frozen food',
  'household',
  'personal care',
  'spices & herbs',
  'snacks',
  'office supplies',
  'pasta and grains',
  'books and magazines',
];
categoriesNames.sort();

const weightType = {
  quantity: 'quantity',
  kilo: 'weightkilo',
};

const formFieldNames = {
  pName: 'productName',
  pNumber: 'productNumber',
  pWeightType: 'productWeightType',
  pCategory: 'productCategory',
  pID: 'pID',
};

const appName = 'easyshopping';

export { categoriesNames, weightType, formFieldNames, appName };
