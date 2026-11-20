import { HeartIcon } from "./Icons";

const categories = ["Hammasi", "Noutbuklar", "Audio", "Aksessuarlar"];

function FilterBar({
  category,
  onCategoryChange,
  favoritesOnly,
  onFavoritesToggle,
  sortOrder,
  onSortChange,
  resultsCount,
}) {
  return (
    <section className="filter-bar" aria-label="Mahsulotlarni saralash">
      <div className="filter-categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={`filter-tab ${category === item ? "active" : ""}`}
            onClick={() => onCategoryChange(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="filter-controls">
        <button
          type="button"
          className={`wishlist-toggle ${favoritesOnly ? "active" : ""}`}
          onClick={onFavoritesToggle}
          aria-pressed={favoritesOnly}
        >
          <HeartIcon filled={favoritesOnly} />
          <span>Faqat sevimlilar</span>
        </button>

        <select
          className="sort-select"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Mahsulotlarni saralash"
        >
          <option value="default">Saralash: Standart</option>
          <option value="price-asc">Narx: Arzondan qimmatga</option>
          <option value="price-desc">Narx: Qimmatdan arzonga</option>
        </select>

        <span className="results-count">{resultsCount} ta mahsulot</span>
      </div>
    </section>
  );
}

export default FilterBar;
