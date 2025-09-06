
# React Cart & Routing Demo

Simple React e-commerce demo with routing and cart page.

## Features

- Product listing page
- Product details modal
- Add to cart
- Cart page with quantity controls and discount
- Routing with React Router

## Main Components

- `App.jsx`: Sets up routes and manages state
- `Header.jsx`: Navigation bar
- `Body.jsx`: Product grid
- `Card.jsx`: Product card
- `CartModel.jsx`: Cart as a full page (not popup)
- `ProductModel.jsx`: Product details modal

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm run dev
   ```

## Notes

- Cart is a separate page (`/cart`), not a popup
- Routing is handled by React Router
- 10% discount for prime users is shown in cart
