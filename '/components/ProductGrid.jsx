import EmptyState from "./EmptyState";
import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, onToggleFavorite, onClearSearch }) {
  if (products.length === 0) {
    return <EmptyState onClear={onClearSearch} />;
  }

  return (
    <section className="product-grid" aria-label="Mahsulotlar katalogi">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default ProductGrid;
