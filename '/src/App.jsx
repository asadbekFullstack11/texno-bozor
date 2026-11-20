import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const initialProducts = [
  {
    id: 1,
    title: 'MacBook Air M2 13"',
    category: "Noutbuklar",
    specs: "8GB RAM • 256GB SSD • Space Gray",
    priceValue: 12400000,
    rating: "4.9",
    stock: 5,
    liked: true,
    icon: "laptop",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    category: "Audio",
    specs: "Active Noise Cancelling • 30 soat batareya",
    priceValue: 4200000,
    rating: "4.8",
    stock: 2,
    liked: false,
    icon: "headphones",
  },
  {
    id: 3,
    title: "Keychron K2 Pro",
    category: "Aksessuarlar",
    specs: "Mexanik klaviatura • Bluetooth / USB-C",
    priceValue: 1350000,
    rating: "4.7",
    stock: 8,
    liked: true,
    icon: "keyboard",
  },
  {
    id: 4,
    title: "Apple Watch Series 9",
    category: "Aksessuarlar",
    specs: "45mm Aluminium • GPS • Midnight",
    priceValue: 5100000,
    rating: "4.8",
    stock: 4,
    liked: false,
    icon: "watch",
  },
  {
    id: 5,
    title: "ASUS Zenbook 14 OLED",
    category: "Noutbuklar",
    specs: "16GB RAM • 512GB SSD • Core Ultra 5",
    priceValue: 10800000,
    rating: "4.7",
    stock: 0,
    liked: false,
    icon: "laptop",
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    category: "Aksessuarlar",
    specs: "8000 DPI • Silent Click • Wireless",
    priceValue: 1180000,
    rating: "4.9",
    stock: 6,
    liked: false,
    icon: "mouse",
  },
];

function formatPrice(value) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

function App() {
  const [page, setPage] = useState("home");
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Hammasi");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notice, setNotice] = useState("");
  const noticeTimeout = useRef(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoriteCount = products.filter((product) => product.liked).length;

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return products
      .filter((product) => (
        (category === "Hammasi" || product.category === category)
        && (!favoritesOnly || product.liked)
        && (!normalizedQuery || `${product.title} ${product.category} ${product.specs}`
          .toLocaleLowerCase()
          .includes(normalizedQuery))
      ))
      .sort((a, b) => {
        if (sortOrder === "price-asc") return a.priceValue - b.priceValue;
        if (sortOrder === "price-desc") return b.priceValue - a.priceValue;
        return a.id - b.id;
      })
      .map((product) => ({ ...product, price: formatPrice(product.priceValue) }));
  }, [category, favoritesOnly, products, query, sortOrder]);

  function showNotice(message) {
    setNotice(message);
    window.clearTimeout(noticeTimeout.current);
    noticeTimeout.current = window.setTimeout(() => setNotice(""), 3000);
  }

  useEffect(() => () => window.clearTimeout(noticeTimeout.current), []);

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product) {
    const currentItem = cart.find((item) => item.id === product.id);
    if (currentItem?.quantity >= product.stock) {
      showNotice("Omborda bundan ortiq mahsulot qolmagan.");
      return;
    }

    setCart((currentCart) => (
      currentItem
        ? currentCart.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ))
        : [...currentCart, { ...product, quantity: 1 }]
    ));
    showNotice(`${product.title} savatga qo‘shildi.`);
  }

  function updateQuantity(productId, change) {
    setCart((currentCart) => currentCart
      .map((item) => (
        item.id === productId
          ? { ...item, quantity: Math.min(item.stock, item.quantity + change) }
          : item
      ))
      .filter((item) => item.quantity > 0));
  }

  function toggleFavorite(productId) {
    setProducts((currentProducts) => currentProducts.map((product) => (
      product.id === productId ? { ...product, liked: !product.liked } : product
    )));
  }

  function handleLogin(credentials) {
    const name = credentials.email.split("@")[0].replace(/[._-]/g, " ");
    setUser({ name, email: credentials.email });
    navigate("home");
    showNotice("Hisobingizga muvaffaqiyatli kirdingiz.");
  }

  function handleRegister(details) {
    setUser({ name: details.name, email: details.email, phone: details.phone });
    navigate("home");
    showNotice("Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi.");
  }

  function handleCheckout(checkoutDetails) {
    const itemsSummary = cart
      .map((item) => `${item.title} (${item.quantity}x)`)
      .join(", ");

    setOrders((currentOrders) => [{
      id: `#${1001 + currentOrders.length}`,
      customer: checkoutDetails.customerName,
      itemsSummary,
      delivery: checkoutDetails.delivery,
      status: "Qabul qilindi",
      total: formatPrice(checkoutDetails.total),
    }, ...currentOrders]);
    setCart([]);
    navigate("home");
    showNotice("Buyurtmangiz qabul qilindi. Rahmat!");
  }

  function openFavorites() {
    setFavoritesOnly(true);
    setCategory("Hammasi");
    navigate("home");
  }

  function openOrders() {
    navigate("home");
    window.requestAnimationFrame(() => {
      document.getElementById("orders-section")?.scrollIntoView({ behavior: "smooth" });
    });
  }

  return (
    <div className="page-shell">
      <Header
        query={query}
        onSearch={(value) => {
          setQuery(value);
          if (page !== "home") navigate("home");
        }}
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        user={user}
        onHome={() => navigate("home")}
        onCart={() => navigate("cart")}
        onFavorites={openFavorites}
        onOrders={openOrders}
        onLogin={() => navigate("login")}
        onRegister={() => navigate("register")}
        onLogout={() => {
          setUser(null);
          showNotice("Hisobdan chiqdingiz.");
        }}
      />

      <main className="container main-content">
        {page === "home" && (
          <HomePage
            products={visibleProducts}
            orders={orders}
            category={category}
            onCategoryChange={setCategory}
            favoritesOnly={favoritesOnly}
            onFavoritesToggle={() => setFavoritesOnly((value) => !value)}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onClearSearch={() => {
              setQuery("");
              setCategory("Hammasi");
              setFavoritesOnly(false);
            }}
          />
        )}

        {page === "cart" && (
          <CartPage
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={(id) => setCart((items) => items.filter((item) => item.id !== id))}
            onClear={() => setCart([])}
            onContinueShopping={() => navigate("home")}
            onCheckout={handleCheckout}
          />
        )}

        {page === "login" && (
          <section className="auth-section">
            <LoginPage
              onSubmit={handleLogin}
              onRegister={() => navigate("register")}
              onBack={() => navigate("home")}
            />
          </section>
        )}

        {page === "register" && (
          <section className="auth-section">
            <RegisterPage
              onSubmit={handleRegister}
              onLogin={() => navigate("login")}
              onBack={() => navigate("home")}
            />
          </section>
        )}
      </main>

      {notice && (
        <div className="app-toast" role="status">
          {notice}
        </div>
      )}
    </div>
  );
}

export default App;
