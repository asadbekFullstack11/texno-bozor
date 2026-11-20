import FilterBar from "../components/FilterBar";
import ProductGrid from "../components/ProductGrid";
import OrdersSection from "../components/OrdersSection";

function HomePage({
  products,
  orders,
  category,
  onCategoryChange,
  favoritesOnly,
  onFavoritesToggle,
  sortOrder,
  onSortChange,
  onAddToCart,
  onToggleFavorite,
  onClearSearch,
}) {
  return (
    <>
      <FilterBar
        category={category}
        onCategoryChange={onCategoryChange}
        favoritesOnly={favoritesOnly}
        onFavoritesToggle={onFavoritesToggle}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        resultsCount={products.length}
      />
      <ProductGrid
        products={products}
        onAddToCart={onAddToCart}
        onToggleFavorite={onToggleFavorite}
        onClearSearch={onClearSearch}
      />
      <OrdersSection orders={orders} />
    </>
  );
}

export default HomePage;
