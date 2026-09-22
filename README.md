# TechStore

TechStore is a responsive electronics shopping experience built with React and Vite. It presents a curated catalog of phones, laptops, audio devices, wearables, gaming products, and accessories with search, filtering, sorting, cart, and wishlist interactions.

## Highlights

- Responsive storefront with hero section, navigation, product grid, and footer
- Catalog of 18 sample products with brand, price, discount, rating, and image data
- Search products by name or brand
- Filter products by brand
- Sort products by price, rating, or name
- Add products to the cart with automatic quantity updates
- Increase, decrease, and remove cart quantities
- View subtotal and checkout call-to-action in the cart drawer
- Add, remove, and move wishlist products to the cart
- Toast notifications for cart and wishlist actions
- Empty states for cart, wishlist, and search results
- Cart and wishlist persistence through browser `localStorage`

## User Flow

1. Select **Explore Products** to jump to the catalog.
2. Search by product name or brand, or choose a brand from the filter.
3. Sort results by price, rating, or name.
4. Select **Add to Cart** to add a product. Selecting it again increases its quantity.
5. Open the cart icon to adjust quantities, remove items, or review the subtotal.
6. Select the heart icon on a product to save it to the wishlist.
7. Open the wishlist to remove saved items or move them to the cart.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React 19 | User interface and state management |
| Vite 8 | Development server and production bundler |
| JavaScript | Application logic and catalog data |
| CSS3 | Responsive layout, theme, drawers, and animations |
| ESLint | Code-quality checks |
| Browser localStorage | Client-side cart and wishlist persistence |

## Getting Started

### Requirements

- Node.js 18 or newer
- npm 9 or newer

### Install dependencies

From the `TechStore` directory:

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite normally serves the app at `http://localhost:5173`.

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run lint checks

```bash
npm run lint
```

## Project Structure

```text
TechStore/
├── public/                    # Static public assets
├── src/
│   ├── assets/
│   │   └── techstore.png      # TechStore logo
│   ├── components/
│   │   ├── data.js            # Product catalog data
│   │   ├── ProductCard.jsx    # Reusable product card
│   │   └── ProductCard.css    # Product card styles
│   ├── App.jsx                # Storefront layout and application state
│   ├── App.css                # Main theme and component styles
│   ├── index.css              # Global entry styles
│   └── main.jsx               # React entry point
├── index.html                 # Vite HTML entry document
├── package.json               # Scripts and dependencies
├── eslint.config.js           # ESLint configuration
└── vite.config.js             # Vite configuration
```

## Application State

The main state is managed in `src/App.jsx`:

| State | Description |
| --- | --- |
| `cartItems` | Products in the cart, including quantity |
| `wishList` | Product IDs saved to the wishlist |
| `SearchTerm` | Current product or brand search text |
| `Selectedbrand` | Active brand filter |
| `SortBy` | Active sorting option |
| `isCartOpen` | Controls the cart drawer |
| `isWishlistOpen` | Controls the wishlist drawer |
| `toast` | Temporary action notification |

### localStorage keys

- `techCard`: serialized cart items and quantities
- `techWish`: serialized wishlist product IDs

Data is stored only in the current browser. Clearing site data resets the cart and wishlist.

## Product Data

Products are defined in `src/components/data.js`. Each record includes:

- `id`
- `name`
- `price`
- `originalPrice`
- `discount`
- `rating`
- `image`
- `isBestSeller`
- `brand`

Product images use external image URLs, so an internet connection may be required for all catalog images to load.

## Current Scope

This is a frontend demonstration project. The checkout button is presentational and does not process payments or create orders. There is no backend, authentication, inventory service, or database integration.

## Development Notes

- Add or edit catalog records in `src/components/data.js`.
- Keep product rendering in `ProductCard.jsx` and `ProductCard.css`.
- Keep storefront state and drawer behavior in `App.jsx`.
- Use the existing CSS variables and responsive breakpoints when extending the interface.
