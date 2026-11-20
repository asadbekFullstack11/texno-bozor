import CartItemCard from "../components/CardItemCard";
import CartSummary from "../components/CardSummary";
import { ArrowLeftIcon, CartIcon } from "../components/Icons";

function formatPrice(value) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

function CartPage({
  items,
  onUpdateQuantity,
  onRemove,
  onClear,
  onContinueShopping,
  onCheckout,
}) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.priceValue * item.quantity,
    0,
  );
  const displayItems = items.map((item) => ({
    ...item,
    name: item.title,
    unitPrice: formatPrice(item.priceValue),
    subtotal: formatPrice(item.priceValue * item.quantity),
  }));

  return (
    <section className="cart-page-section" aria-label="Savat sahifasi">
      <div className="cart-page-top">
        <div>
          <span className="auth-badge">Savat</span>
          <h2 className="cart-page-title">Savatingiz</h2>
          <p className="cart-page-subtitle">
            {itemCount
              ? `${itemCount} ta mahsulot tanlangan — buyurtmani rasmiylashtiring`
              : "Savatingiz hozircha bo‘sh"}
          </p>
        </div>

        <button type="button" className="auth-back-btn" onClick={onContinueShopping}>
          <ArrowLeftIcon />
          <span>Do‘konga qaytish</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><CartIcon /></div>
          <h3 className="empty-state-title">Savatingiz bo‘sh</h3>
          <p className="empty-state-desc">
            Mahsulotlarni ko‘rib chiqing va xaridni boshlash uchun savatga qo‘shing.
          </p>
          <button type="button" className="empty-state-btn" onClick={onContinueShopping}>
            Xaridni boshlash
          </button>
        </div>
      ) : (
        <div className="cart-page-grid">
          <div className="cart-items-card">
            <div className="cart-header">
              <h3 className="cart-title">
                <CartIcon />
                <span>Tanlangan mahsulotlar ({itemCount})</span>
              </h3>
              <button type="button" className="btn-clear" onClick={onClear}>
                Savatni tozalash
              </button>
            </div>

            <ul className="cart-page-list">
              {displayItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onDecrease={() => onUpdateQuantity(item.id, -1)}
                  onIncrease={() => onUpdateQuantity(item.id, 1)}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </ul>
          </div>

          <CartSummary
            subtotal={subtotal}
            onCheckout={onCheckout}
          />
        </div>
      )}
    </section>
  );
}

export default CartPage;
