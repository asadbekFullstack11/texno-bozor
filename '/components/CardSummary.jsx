import { useState } from "react";

function formatPrice(value) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

function CartSummary({ subtotal, onCheckout }) {
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoMessage, setPromoMessage] = useState("");
  const [delivery, setDelivery] = useState("courier");
  const [formError, setFormError] = useState("");

  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryPrice = delivery === "courier" ? 30000 : 0;
  const total = subtotal - discount + deliveryPrice;

  function applyPromo() {
    if (promo.trim().toUpperCase() === "SALE10") {
      setPromoApplied(true);
      setPromoMessage("SALE10 qo‘llandi — 10% chegirma");
    } else {
      setPromoApplied(false);
      setPromoMessage("Promo kod noto‘g‘ri. SALE10 kodini sinab ko‘ring.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("customerName").toString().trim();
    const phone = formData.get("phone").toString().trim();
    if (!name || !phone) {
      setFormError("Ism va telefon raqamingizni kiriting.");
      return;
    }
    setFormError("");
    onCheckout({
      customerName: name,
      delivery: delivery === "courier" ? "Kuryer orqali" : "Do‘kondan olib ketish",
      total,
    });
  }

  return (
    <aside className="cart-summary-card">
      <h3 className="cart-summary-title">Buyurtmani rasmiylashtirish</h3>

      <div className="promo-section">
        <div className="promo-row">
          <input
            type="text"
            className="promo-input"
            placeholder="Promo kod (masalan: SALE10)"
            value={promo}
            onChange={(event) => setPromo(event.target.value)}
            aria-label="Promo kod"
          />
          <button type="button" className="btn-promo" onClick={applyPromo}>
            Qo‘llash
          </button>
        </div>
        {promoMessage && (
          <p className={`promo-status ${promoApplied ? "" : "promo-status--error"}`} role="status">
            {promoMessage}
          </p>
        )}
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <p className="checkout-heading">Buyurtma ma’lumotlari</p>

        <input
          type="text"
          name="customerName"
          className="form-field"
          placeholder="Ismingiz"
          autoComplete="name"
          required
        />

        <input
          type="tel"
          name="phone"
          className="form-field"
          placeholder="+998 90 123 45 67"
          autoComplete="tel"
          required
        />

        {formError && <p className="form-error" role="alert">{formError}</p>}

        <div className="delivery-options" aria-label="Yetkazib berish usuli">
          <button
            type="button"
            className={`delivery-chip ${delivery === "courier" ? "active" : ""}`}
            onClick={() => setDelivery("courier")}
            aria-pressed={delivery === "courier"}
          >
            Kuryer orqali
            <span>30 000 so'm</span>
          </button>
          <button
            type="button"
            className={`delivery-chip ${delivery === "pickup" ? "active" : ""}`}
            onClick={() => setDelivery("pickup")}
            aria-pressed={delivery === "pickup"}
          >
            Olib ketish
            <span>Bepul</span>
          </button>
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Mahsulotlar</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {promoApplied && (
            <div className="summary-row summary-row--discount">
              <span>Chegirma (10%)</span>
              <span>− {formatPrice(discount)}</span>
            </div>
          )}
          <div className="summary-row">
            <span>Yetkazib berish</span>
            <span>{deliveryPrice ? formatPrice(deliveryPrice) : "Bepul"}</span>
          </div>
          <div className="summary-total">
            <span>Jami summa</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button type="submit" className="btn-checkout">
          Buyurtma berish
        </button>
      </form>
    </aside>
  );
}

export default CartSummary;
