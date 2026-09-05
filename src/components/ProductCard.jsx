import "./ProductCard.css";
import { useState } from "react";

export default function ProductCard({
  image,
  name,
  price,
  originalPrice,
  discount,
  rating,
  isBestSeller,
  isWishlisted,
  onAddTocart,
  onToggleWishlist
}) {
  const [addedToCart, setAddedToCart] = useState(false);

  function handleAddToCart() {
    onAddTocart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  }

  return (
    <div className="product-card">
      
      {/* Discount Badge */}
      {discount && <span className="discount-badge">{discount}</span>}

      {/* Wishlist Button */}
      <button
        className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist();
        }}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isWishlisted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        )}
      </button>

      {/* Product Image */}
      <div className="image-container">
        <img src={image} alt={name} className="product-image" />
      </div>

      {/* Content */}
      <div className="card-content">
        <h3 className="product-name">{name}</h3>

        {/* Rating */}
        <div className="rating">
          <span className="stars">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="rating-value">{rating}</span>
          {isBestSeller && <span className="bestseller-tag">Best Seller</span>}
        </div>

        {/* Price */}
        <div className="price-row">
          <span className="price">₹ {price.toLocaleString()}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`add-btn ${addedToCart ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {addedToCart ? "✓ Added " : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
