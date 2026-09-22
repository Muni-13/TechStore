import ProductCard from "./components/ProductCard";
import "./App.css";
import products from "./components/data.js"
import { useEffect, useState } from "react";
import techstoreLogo from "./assets/techstore.png";


function App() { 

    const allBrands = [...new Set(products.map(p=>p.brand))];
    //cart item-array of product in card
    const [cartItems,setCartItems] = useState(()=>{
      const cart = localStorage.getItem("techCard");
      if(cart){
        try {
          return JSON.parse(cart);
        } catch (error) {
          console.error("Proble!!",error);
          return [];
        }
      }else{
        return [];
      }

      
    });

    useEffect(()=>{
      localStorage.setItem("techCard",JSON.stringify(cartItems))
    },[cartItems])
    //wishlist -array of prducts Ids that  are wishlisted
    const [wishList,setWishList] = useState(()=>{
      const wish = localStorage.getItem("techWish");
      if(wish){
        return JSON.parse(wish);
      }else{
        return [];
      }
    });

    useEffect(()=>{
      localStorage.setItem("techWish",JSON.stringify(wishList))
    },[wishList])
    //search-what are user types in serach box
    const [SearchTerm,setSearchTerm] = useState("");
    //brand filter -which brand is selected(All- means show all)
    const [Selectedbrand,setSelectedbrand] = useState("All");
    //sort -how to sort products
    const [SortBy,setSortBy] = useState("default");

    // Drawer states
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);

    // Toast notification
    const [toast, setToast] = useState(null);

    function showToast(message, type = "success") {
      setToast({ message, type });
      setTimeout(() => setToast(null), 2500);
    }


      function addToCart(product){
        //check if card item exits
        const existingItem = cartItems.find(item=>item.id===product.id);
        if(existingItem){
          //product is there in the cart
          setCartItems(cartItems.map((item)=>//array of objects
          item.id===product.id?{...item,quantity: item.quantity+1}: item));
          showToast(`${product.name.slice(0, 25)}... quantity updated!`);
        }else{
          //product not there
          setCartItems([...cartItems,{...product,quantity:1}]);
          showToast(`${product.name.slice(0, 25)}... added to cart!`);
        }
      }

      // Remove from cart
      function removeFromCart(productId) {
        setCartItems(cartItems.filter(item => item.id !== productId));
        showToast("Item removed from cart", "info");
      }

      // Update quantity
      function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
          removeFromCart(productId);
          return;
        }
        setCartItems(cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }


      //calculate total no.of cart items
      const cartCount = cartItems.reduce((total,item)=>total+item.quantity,0);

      //calculate total price
      const cartTotal = cartItems.reduce((total,item)=>total + item.price * item.quantity,0);


      //wishlist function
      function toggleWishlist(productId){
        if(wishList.includes(productId)){
          //Already existing-remove it
          setWishList(wishList.filter(id=>id!==productId));
          showToast("Removed from wishlist", "info");
        }else{
          setWishList([...wishList,productId]);
          showToast("Added to wishlist! ❤️");
        }
      }

      // Get wishlisted products
      const wishlistedProducts = products.filter(p => wishList.includes(p.id));


      //step1- filter  based on search [based on brand]
      let filteredProducts = products.filter(product=>{
        const matchesSearch = product.name.toLowerCase().includes(SearchTerm.toLowerCase()) ||
                              product.brand.toLowerCase().includes(SearchTerm.toLowerCase());
        const matchesBrand = Selectedbrand === "All" || product.brand === Selectedbrand;
        return matchesSearch && matchesBrand;
      })

      // step2 - sort the filtered products
      if (SortBy === "price-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
      } else if (SortBy === "price-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
      } else if (SortBy === "rating") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
      } else if (SortBy === "name") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      }

  return (
    
    <div className="app">

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            )}
          </span>
          {toast.message}
        </div>
      )}

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <a href="/" className="logo">
            <span className="brand-logo-frame" aria-hidden="true">
              <img src={techstoreLogo} alt="" className="brand-logo-image" />
            </span>
            TechStore
          </a>

          <ul className="nav-links">
            <li>
              <a href="#products" className="nav-link">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Deals
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                About
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            {/* Wishlist button */}
            <button
              className="nav-icon-btn"
              onClick={() => { setIsWishlistOpen(true); setIsCartOpen(false); }}
              title="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              {wishList.length > 0 && (
                <span className="nav-badge wishlist-badge">{wishList.length}</span>
              )}
            </button>

            {/* Cart button */}
            <button
              className="nav-icon-btn"
              onClick={() => { setIsCartOpen(true); setIsWishlistOpen(false); }}
              title="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              {cartCount > 0 && (
                <span className="nav-badge cart-badge">{cartCount}</span>
              )}
            </button>

            <button className="nav-btn primary">Shop Now</button>
          </div>
        </div>
      </nav>

      {/* ===== CART DRAWER ===== */}
      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Your Cart <span className="drawer-count">({cartCount} items)</span>
              </h3>
              <button className="drawer-close" onClick={() => setIsCartOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="drawer-empty">
                <span className="drawer-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </span>
                <p className="drawer-empty-title">Your cart is empty</p>
                <p className="drawer-empty-sub">Add some awesome tech!</p>
                <button className="drawer-empty-btn" onClick={() => setIsCartOpen(false)}>Browse Products</button>
              </div>
            ) : (
              <>
                <div className="drawer-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="drawer-item">
                      <div className="drawer-item-img-wrap">
                        <img src={item.image} alt={item.name} className="drawer-item-img" />
                      </div>
                      <div className="drawer-item-info">
                        <p className="drawer-item-name">{item.name}</p>
                        <p className="drawer-item-price">₹ {item.price.toLocaleString()}</p>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                          <span className="qty-value">{item.quantity}</span>
                          <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                      <button className="drawer-item-remove" onClick={() => removeFromCart(item.id)} title="Remove">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="drawer-footer">
                  <div className="drawer-total-row">
                    <span className="drawer-total-label">Subtotal</span>
                    <span className="drawer-total-value">₹ {cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="checkout-btn">Proceed to Checkout →</button>
                  <p className="drawer-footer-note">Free shipping on orders above ₹999</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== WISHLIST DRAWER ===== */}
      {isWishlistOpen && (
        <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header wishlist-drawer-header">
              <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                Wishlist <span className="drawer-count">({wishList.length} items)</span>
              </h3>
              <button className="drawer-close" onClick={() => setIsWishlistOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {wishlistedProducts.length === 0 ? (
              <div className="drawer-empty">
                <span className="drawer-empty-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </span>
                <p className="drawer-empty-title">Your wishlist is empty</p>
                <p className="drawer-empty-sub">Save items you love!</p>
                <button className="drawer-empty-btn" onClick={() => setIsWishlistOpen(false)}>Browse Products</button>
              </div>
            ) : (
              <div className="drawer-items">
                {wishlistedProducts.map(item => (
                  <div key={item.id} className="drawer-item">
                    <div className="drawer-item-img-wrap">
                      <img src={item.image} alt={item.name} className="drawer-item-img" />
                    </div>
                    <div className="drawer-item-info">
                      <p className="drawer-item-name">{item.name}</p>
                      <p className="drawer-item-price">₹ {item.price.toLocaleString()}</p>
                      <button
                        className="wishlist-add-cart-btn"
                        onClick={() => { addToCart(item); toggleWishlist(item.id); setIsWishlistOpen(false); setIsCartOpen(true); }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', verticalAlign: 'middle'}}><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        Move to Cart
                      </button>
                    </div>
                    <button className="drawer-item-remove" onClick={() => toggleWishlist(item.id)} title="Remove from wishlist">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Arrivals 2026</p>
          <h1 className="hero-title">
            The Future of Tech
            <br />
            <span className="hero-highlight">Is Here.</span>
          </h1>
          <p className="hero-description">
            Discover the latest in premium technology. From powerful computers
            to cutting-edge smartphones, find everything you need in one place.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>Explore Products</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat">
            <span className="stat-number">200+</span>
            <span className="stat-label">Premium Products</span>
          </div>
          <div className="stat">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Customer Support</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <div className="section-header">
          <h2 className="section-title">Best Sellers</h2>
          <p className="section-subtitle">
            Our most popular products loved by customers
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="controls-bar">
          {/* Search */}
          <div className="search-container">
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={SearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {SearchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm("")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="filter-group">
            <label className="filter-label">Brand</label>
            <select
              className="filter-select"
              value={Selectedbrand}
              onChange={(e) => setSelectedbrand(e.target.value)}
            >
              <option value="All">All Brands</option>
              {allBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              className="filter-select"
              value={SortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>
        </div>

        {/* Active filter pills + Results info */}
        <div className="results-bar">
          <div className="results-left">
            <span className="results-count">
              Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
            </span>
            {Selectedbrand !== "All" && (
              <span className="filter-pill">
                {Selectedbrand}
                <button onClick={() => setSelectedbrand("All")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </span>
            )}
            {SearchTerm && (
              <span className="filter-pill">
                "{SearchTerm}"
                <button onClick={() => setSearchTerm("")}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </span>
            )}
          </div>
          {(SearchTerm || Selectedbrand !== "All" || SortBy !== "default") && (
            <button className="clear-all-btn" onClick={() => { setSearchTerm(""); setSelectedbrand("All"); setSortBy("default"); }}>
              Clear All
            </button>
          )}
        </div>

        <div className="product-grid">
        
         { filteredProducts.length > 0 ? (
           filteredProducts.map((data)=>(
            
               <ProductCard
               key={data.id}
               id={data.id}
               image={data.image}
               name={data.name}
               price={data.price}
               originalPrice={data.originalPrice}
              discount={data.discount}
              rating={data.rating}
              isBestSeller={data.isBestSeller}
              isWishlisted={wishList.includes(data.id)}
              onAddTocart={() => addToCart(data)}
              onToggleWishlist={() => toggleWishlist(data.id)}
               />)
          )
         ) : (
           <div className="no-results">
             <span className="no-results-icon">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
             </span>
             <h3>No products found</h3>
             <p>Try adjusting your search or filters</p>
             <button className="no-results-btn" onClick={() => { setSearchTerm(""); setSelectedbrand("All"); setSortBy("default"); }}>
               Reset Filters
             </button>
           </div>
         )}
          

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-logo-frame" aria-hidden="true">
              <img src={techstoreLogo} alt="" className="brand-logo-image" />
            </span>
            TechStore
          </div>
          <p>&copy; 2026 TechStore. All rights reserved. Made with love </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
