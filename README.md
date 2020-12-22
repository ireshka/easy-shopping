# Easy Shopping - Your simple shopping list :shopping_cart:

> It's an app that helps you make **shopping list** before the next visit a in local supermarket or before an online shopping sessions. Without getting lost with a paper list.

> You can check demo at: [EasyShopping](https://ireshka.github.io/easy-shopping/)

## About project :clipboard:

App was a recruitment task that required webpack for building and using vanilla js.

I decided to use Material Design Bootstrap for fast styling and reduce custom css so I didn't follow BEM methodology in this project. Webpack setup comes from company which send the task.

## Functionalities :gear:

- user can add products (with category, number, and weight or amount) and display list sorted by category
- user can see total sum of products on list, their weight and number of pieces
- user can remove or edit products
- user can check products off list
- user can print formatted list
- user can save data in browser between sessions (app use localStorage)
- user can work with app on mobile or desktop (desing follows RWD rules) but devices don't share data

## Setup for local development :hammer:

1. Clone repository

```
git clone https://github.com/ireshka/easy-shopping.git
```

2. Inside directory - install required dependencies

```
cd easy-shopping
npm i
```

3. Run development server

```
npm run start
```

Have fun.

## Credits :raised_hands:

- basket favicon by [Turan Kent](https://www.behance.net/tkent) from [icon-icons](https://icon-icons.com)
- webpack boilerplate based on [MDB Webpack Stater](https://github.com/mdbootstrap/mdb-webpack-starter)
