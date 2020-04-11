# Shopping Cart

Using React 16.13.0 (CRA), react-modal 3.11.2 and react-modal-hook 3.0.0

## Requirements
- **NPM** (recommended version: 6.13.4+).
- **Node.js** (recommended version: 12.16.1+).

## Install
Clone this repository, then cd into the cloned repository's dir (shopping-cart).
```
npm install && cd client && npm install && cd ..
```
This will install the Api server and the Client.

## Run
Once installed, just run:
```
npm run start
```
This will run the client and the server concurrently in ports 3000 and 3001 respectively.

## Tests
Once installed, run the following command inside the 'client' folder:
```
npm run test
```
This will run the functional tests for the application.

## App Description
This repository contains an application for the Store that sells the products that has the following features:

### Functional Features
- **Products List**: It shows the available products that the shop is selling at the moment.
- **Shopping Cart**: This is where the shopping summary will be shown, including the total items, the discounts applied and the final price.
- **Product Detail**: This modal shows further details about a selected product from the product list and allows you to add it to the cart.
- **i18n**: In an effort to separate language from implementation, all texts are stored in separate files, providing a good start for a good i18n and l10n library to adapt the product to the desired culture, region, or language.
- **Testing**: A set of functional tests have been set up that follow the principles of the [Testing Library](https://testing-library.com/docs/guiding-principles), ensuring the tests give confidence that the application will work when a real user uses it.

### Technical Details
- **Checkout**:
  - The shopping cart and product and discounts logic resides in a Singleton Class called 'Checkout' and it provides and has the required methods and utilities to comply with the requisites and the UI necessities, and can be instantiated with the products and discounts available.
  - The state of the App (cart status, available products and discounts) is modified at the same time as the Checkout state, ensuring a single point of failure/modification.
- **Product List**:
  - At the start of the application, the available products and discounts are fetch from the server, in the meantime a loading screen is shown.
  - The spinner inputs allow to add and remove items to the cart until the maximum is reached (configured per product).
  - The product title opens up a modal to show a bigger picture of the product, and the details of it, and also allows you to add the product to the cart, given the upper limit for that product quantity is not reached.
- **Shopping Cart and Summary Section**:
  - It shows the items currently stored in Checkout and lists the applied discounts given the products in the cart.
  - Provides a "Checkout" button to do as such, and this empties the cart.
- **Shop API**: The data for the application is being served from a development server alongside with the client.
  - The **api** folder contains logic to fetch the data from the server and also provides a *fakeApi* for testing.
  - The product images are stored in the server.
- Comunication between components and the store is done via reducers implemented using React Reducers.
- The App's UI is splitted in "application" and "components", the former coupled with the product implementation (products, summary, etc), and the latter comprised of reusable UI widgets, that are implementation-agnostic.
- Alongside with the provided styling, a very few other styles have been implemented (page flow, modal, loading spinners, icons).
