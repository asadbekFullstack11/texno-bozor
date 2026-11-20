import OrderCard from "./OrderCard";

function OrdersSection({ orders }) {
  return (
    <section id="orders-section" className="orders-section" aria-label="So'nggi buyurtmalar">
      <div className="orders-header">
        <div>
          <h2 className="orders-title">So‘nggi buyurtmalar</h2>
          <p className="orders-subtitle">
            {orders.length ? "Siz bergan buyurtmalar ro‘yxati" : "Buyurtmalar tarixi"}
          </p>
        </div>
      </div>

      {orders.length ? (
        <div className="orders-grid">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="orders-empty">Hozircha buyurtmalaringiz yo‘q.</p>
      )}
    </section>
  );
}

export default OrdersSection;
